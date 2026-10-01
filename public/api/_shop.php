<?php
// E-book store: database, PhonePe client and order reconciliation.
// The database is the source of truth for who may download a paid PDF.
require_once __DIR__ . '/_lib.php';

const ORDER_EXPIRY_SECONDS = 1200;      // PhonePe checkout link lifetime
const EXPIRY_GRACE_SECONDS = 300;       // wait this long after expiry before cancelling a pending order
const DOWNLOAD_LIMIT = 10;
const SITE_URL = 'https://sanatanroop.com';

// Secrets, the database and paid PDFs live outside the web root when the host allows it
function private_dir(): string
{
    static $dir = null;
    if ($dir !== null) return $dir;
    $candidates = [];
    if (getenv('SANATAN_PRIVATE_DIR')) $candidates[] = getenv('SANATAN_PRIVATE_DIR');
    $candidates[] = dirname(rtrim($_SERVER['DOCUMENT_ROOT'] ?? __DIR__, '/')) . '/sanatanroop_private';
    ensure_data_dir();
    $candidates[] = DATA_DIR . '/private'; // inside the web root but denied by .htaccess
    foreach ($candidates as $candidate) {
        if ((is_dir($candidate) || @mkdir($candidate, 0700, true)) && is_writable($candidate)) {
            return $dir = $candidate;
        }
    }
    respond(500, ['error' => 'Storage unavailable']);
}

function private_dir_is_outside_webroot(): bool
{
    $root = realpath($_SERVER['DOCUMENT_ROOT'] ?? __DIR__) ?: '';
    return $root === '' || strpos(realpath(private_dir()) ?: '', $root) !== 0;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo) return $pdo;
    if (!in_array('sqlite', PDO::getAvailableDrivers(), true)) respond(500, ['error' => 'Database driver unavailable']);
    $pdo = new PDO('sqlite:' . private_dir() . '/shop.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA foreign_keys = ON');
    $pdo->exec('PRAGMA busy_timeout = 5000');
    $pdo->exec('PRAGMA journal_mode = WAL');
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            description TEXT NOT NULL DEFAULT '',
            price INTEGER NOT NULL CHECK (price >= 100),           -- paise
            currency TEXT NOT NULL DEFAULT 'INR' CHECK (currency = 'INR'),
            pdf_file TEXT,                                         -- file name inside the private books folder
            pdf_name TEXT,
            pdf_size INTEGER,
            cover_image TEXT NOT NULL DEFAULT '',
            status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_number TEXT NOT NULL UNIQUE,                     -- sent to PhonePe as merchantOrderId
            product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT NOT NULL DEFAULT '',
            amount INTEGER NOT NULL CHECK (amount >= 100),         -- paise
            currency TEXT NOT NULL DEFAULT 'INR',
            payment_gateway TEXT NOT NULL DEFAULT 'phonepe',
            gateway_order_id TEXT,
            gateway_transaction_id TEXT,
            payment_status TEXT NOT NULL DEFAULT 'pending'
                CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled', 'refunded')),
            status_note TEXT NOT NULL DEFAULT '',
            checkout_url TEXT,
            expires_at INTEGER,
            paid_at INTEGER,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders (customer_email, product_id);
        CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (payment_status, created_at);
        CREATE INDEX IF NOT EXISTS idx_orders_gateway ON orders (gateway_order_id);
        CREATE TABLE IF NOT EXISTS purchases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL UNIQUE REFERENCES orders(id) ON DELETE RESTRICT,
            product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
            customer_email TEXT NOT NULL,
            download_count INTEGER NOT NULL DEFAULT 0,
            download_limit INTEGER NOT NULL DEFAULT " . DOWNLOAD_LIMIT . ",
            revoked_at INTEGER,
            created_at INTEGER NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_purchases_customer ON purchases (customer_email, product_id);
        CREATE TABLE IF NOT EXISTS webhook_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_key TEXT NOT NULL UNIQUE,                        -- makes repeated deliveries a no-op
            event TEXT NOT NULL,
            order_number TEXT,
            received_at INTEGER NOT NULL
        );
    ");
    return $pdo;
}

// ---- Payment gateway settings (kept in the private folder, never sent to the browser) ----

function gateway_config(): array
{
    $file = private_dir() . '/phonepe-config.php';
    $config = is_file($file) ? (require $file) : [];
    return is_array($config) ? $config : [];
}

function save_gateway_config(array $config): void
{
    $file = private_dir() . '/phonepe-config.php';
    file_put_contents($file, "<?php\nreturn " . var_export($config, true) . ";\n", LOCK_EX);
    @chmod($file, 0600);
    @unlink(private_dir() . '/phonepe-token.php');
}

function gateway_ready(): bool
{
    $c = gateway_config();
    return !empty($c['client_id']) && !empty($c['client_secret']) && !empty($c['client_version']);
}

function phonepe_urls(): array
{
    // Test hook: a local mock gateway, only when the server environment sets it
    if ($mock = getenv('PHONEPE_MOCK_BASE')) return ['auth' => "$mock/v1/oauth/token", 'pg' => $mock];
    if ((gateway_config()['environment'] ?? 'sandbox') === 'production') {
        return [
            'auth' => 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token',
            'pg' => 'https://api.phonepe.com/apis/pg',
        ];
    }
    return [
        'auth' => 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token',
        'pg' => 'https://api-preprod.phonepe.com/apis/pg-sandbox',
    ];
}

// Returns [httpStatus, decodedBody|null]; status 0 means network error or timeout
function http_request(string $method, string $url, array $headers, ?string $body): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_CONNECTTIMEOUT => 6,
        CURLOPT_TIMEOUT => 20,
    ]);
    if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    $raw = curl_exec($ch);
    $status = $raw === false ? 0 : (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    return [$status, $raw === false ? null : json_decode($raw, true)];
}

function phonepe_token(bool $forceRefresh = false): ?string
{
    $cache = private_dir() . '/phonepe-token.php';
    if (!$forceRefresh && is_file($cache)) {
        $cached = require $cache;
        if (is_array($cached) && ($cached['expires_at'] ?? 0) > time() + 120) return $cached['access_token'];
    }
    $c = gateway_config();
    [$status, $data] = http_request('POST', phonepe_urls()['auth'], ['Content-Type: application/x-www-form-urlencoded'], http_build_query([
        'client_id' => $c['client_id'] ?? '',
        'client_version' => $c['client_version'] ?? '',
        'client_secret' => $c['client_secret'] ?? '',
        'grant_type' => 'client_credentials',
    ]));
    if ($status !== 200 || empty($data['access_token'])) return null;
    file_put_contents($cache, "<?php\nreturn " . var_export([
        'access_token' => $data['access_token'],
        'expires_at' => (int) ($data['expires_at'] ?? (time() + 600)),
    ], true) . ";\n", LOCK_EX);
    @chmod($cache, 0600);
    return $data['access_token'];
}

function phonepe_call(string $method, string $path, ?array $body = null): array
{
    for ($attempt = 0; $attempt < 2; $attempt++) {
        $token = phonepe_token($attempt === 1);
        if (!$token) return [0, null];
        [$status, $data] = http_request(
            $method,
            phonepe_urls()['pg'] . $path,
            ['Content-Type: application/json', 'Authorization: O-Bearer ' . $token],
            $body === null ? null : json_encode($body)
        );
        if ($status !== 401) return [$status, $data];
    }
    return [$status, $data];
}

// ---- Orders ----

// The customer's access token is derived from the order number, so it never needs storing
function order_access_token(string $orderNumber): string
{
    return b64url(hash_hmac('sha256', 'order-access:' . $orderNumber, secret(), true));
}

function order_token_valid(string $orderNumber, ?string $token): bool
{
    return is_string($token) && $token !== '' && hash_equals(order_access_token($orderNumber), $token);
}

function find_order(string $orderNumber): ?array
{
    $stmt = db()->prepare('SELECT * FROM orders WHERE order_number = ?');
    $stmt->execute([$orderNumber]);
    return $stmt->fetch() ?: null;
}

// Applies a state reported by PhonePe's own status API. Only moves an order forward, so repeated
// webhooks, refreshes and polls are harmless. Returns the order's status afterwards.
function apply_gateway_status(string $orderNumber, array $gateway): string
{
    $pdo = db();
    $pdo->exec('BEGIN IMMEDIATE');
    try {
        $order = find_order($orderNumber);
        if (!$order) {
            $pdo->exec('ROLLBACK');
            return 'unknown';
        }
        $current = $order['payment_status'];
        $state = $gateway['state'] ?? '';
        $new = $current;
        $note = $order['status_note'];
        $transactionId = $order['gateway_transaction_id'];
        foreach (($gateway['paymentDetails'] ?? []) as $attempt) {
            if (($attempt['state'] ?? '') === 'COMPLETED' || !$transactionId) $transactionId = $attempt['transactionId'] ?? $transactionId;
        }

        if (in_array($current, ['pending', 'failed', 'cancelled'], true)) {
            if ($state === 'COMPLETED') {
                if ((int) ($gateway['amount'] ?? -1) !== (int) $order['amount'] || $order['currency'] !== 'INR') {
                    // Money moved but not the amount we asked for: no access, needs a human
                    $new = 'failed';
                    $note = 'amount_mismatch: gateway reported ' . (int) ($gateway['amount'] ?? 0) . ' paise';
                } else {
                    $new = 'paid';
                    $note = '';
                }
            } elseif ($current === 'pending' && $state === 'FAILED') {
                $new = 'failed';
                $note = (string) ($gateway['errorCode'] ?? ($gateway['paymentDetails'][0]['errorCode'] ?? 'payment_failed'));
            } elseif ($current === 'pending' && time() > (int) $order['expires_at'] + EXPIRY_GRACE_SECONDS) {
                $new = 'cancelled';
                $note = 'expired';
            }
        }

        if ($new !== $current || $transactionId !== $order['gateway_transaction_id']) {
            $pdo->prepare('UPDATE orders SET payment_status = ?, status_note = ?, gateway_order_id = COALESCE(?, gateway_order_id),
                           gateway_transaction_id = ?, paid_at = CASE WHEN ? = \'paid\' THEN ? ELSE paid_at END, updated_at = ? WHERE id = ?')
                ->execute([$new, $note, $gateway['orderId'] ?? null, $transactionId, $new, time(), time(), $order['id']]);
        }
        if ($new === 'paid') {
            $pdo->prepare('INSERT OR IGNORE INTO purchases (order_id, product_id, customer_email, created_at) VALUES (?, ?, ?, ?)')
                ->execute([$order['id'], $order['product_id'], $order['customer_email'], time()]);
        }
        $pdo->exec('COMMIT');
    } catch (Throwable $e) {
        $pdo->exec('ROLLBACK');
        throw $e;
    }
    if ($new === 'paid' && $current !== 'paid') send_purchase_email($orderNumber);
    return $new;
}

function mark_refunded(string $orderNumber, string $note): void
{
    db()->prepare("UPDATE orders SET payment_status = 'refunded', status_note = ?, updated_at = ? WHERE order_number = ? AND payment_status = 'paid'")
        ->execute([$note, time(), $orderNumber]);
}

// Asks PhonePe for the truth about an order and stores it. Returns the order's status afterwards.
function reconcile_order(string $orderNumber): string
{
    $order = find_order($orderNumber);
    if (!$order) return 'unknown';
    if (!in_array($order['payment_status'], ['pending', 'failed', 'cancelled'], true)) return $order['payment_status'];
    if (!gateway_ready()) return $order['payment_status'];

    [$status, $data] = phonepe_call('GET', '/checkout/v2/order/' . rawurlencode($orderNumber) . '/status?details=false&errorContext=true');
    if ($status === 200 && is_array($data)) return apply_gateway_status($orderNumber, $data);
    // Timeout or gateway error: leave it pending unless it is long past expiry and PhonePe never knew it
    if ($order['payment_status'] === 'pending' && !$order['gateway_order_id']
        && time() > (int) $order['expires_at'] + EXPIRY_GRACE_SECONDS) {
        return apply_gateway_status($orderNumber, ['state' => 'PENDING']);
    }
    return $order['payment_status'];
}

// Catches payments where the customer never came back and the webhook was missed
function reconcile_stale_orders(int $limit = 5): void
{
    $stmt = db()->prepare("SELECT order_number FROM orders WHERE payment_status = 'pending' AND created_at < ? ORDER BY updated_at ASC LIMIT ?");
    $stmt->execute([time() - 120, $limit]);
    foreach ($stmt->fetchAll(PDO::FETCH_COLUMN) as $orderNumber) {
        db()->prepare('UPDATE orders SET updated_at = ? WHERE order_number = ?')->execute([time(), $orderNumber]);
        reconcile_order($orderNumber);
    }
}

function order_page_url(string $orderNumber): string
{
    return SITE_URL . '/ebooks/order/?o=' . rawurlencode($orderNumber) . '&t=' . order_access_token($orderNumber);
}

function send_purchase_email(string $orderNumber): void
{
    $stmt = db()->prepare('SELECT o.*, p.title FROM orders o JOIN products p ON p.id = o.product_id WHERE o.order_number = ?');
    $stmt->execute([$orderNumber]);
    $order = $stmt->fetch();
    if (!$order) return;
    @mail(
        $order['customer_email'],
        '=?UTF-8?B?' . base64_encode('SanatanRoop: आपकी पुस्तक तैयार है — ' . $order['title']) . '?=',
        "नमस्ते {$order['customer_name']},\n\nआपका भुगतान सफल रहा। पुस्तक डाउनलोड करने के लिए यह लिंक खोलें:\n"
            . order_page_url($orderNumber) . "\n\nOrder: {$order['order_number']}\n"
            . 'Amount: ₹' . number_format($order['amount'] / 100, 2) . "\n\nयह लिंक केवल आपके लिए है, कृपया इसे साझा न करें।\n— SanatanRoop",
        "From: SanatanRoop <noreply@sanatanroop.com>\r\nContent-Type: text/plain; charset=UTF-8"
    );
}

function public_product(array $p): array
{
    return [
        'slug' => $p['slug'],
        'title' => $p['title'],
        'description' => $p['description'],
        'price' => (int) $p['price'],
        'currency' => $p['currency'],
        'coverImage' => $p['cover_image'],
        'pdfSize' => $p['pdf_size'] ? (int) $p['pdf_size'] : null,
        'available' => !empty($p['pdf_file']),
    ];
}

function throttle(string $bucket, int $max, int $windowSeconds): void
{
    ensure_data_dir();
    $file = DATA_DIR . "/throttle-$bucket-" . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.txt';
    $hits = array_filter(is_file($file) ? explode("\n", (string) file_get_contents($file)) : [], fn($t) => (int) $t > time() - $windowSeconds);
    if (count($hits) >= $max) respond(429, ['error' => 'Too many requests. Please try again later.']);
    $hits[] = time();
    file_put_contents($file, implode("\n", $hits), LOCK_EX);
}
