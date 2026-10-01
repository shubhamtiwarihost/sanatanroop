<?php
// E-book store API. Public actions: products, product, create-order, order-status, resend-links.
// Admin actions (X-Admin-Token): admin-products, save-product, delete-product, upload-pdf,
// admin-orders, recheck-order, set-access, gateway-settings, save-gateway-settings.
require __DIR__ . '/_shop.php';

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

function need(string $method): void
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) respond(405, ['error' => 'Method not allowed']);
}

function clean_line(array $body, string $key, int $max): string
{
    return mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string) ($body[$key] ?? ''))), 0, $max);
}

switch ($action) {
    // ---------------------------------------------------------------- public
    case 'products':
        need('GET');
        $rows = db()->query("SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC")->fetchAll();
        respond(200, ['products' => array_map('public_product', $rows), 'checkoutEnabled' => gateway_ready()]);

    case 'product':
        need('GET');
        $stmt = db()->prepare("SELECT * FROM products WHERE slug = ? AND status = 'active'");
        $stmt->execute([(string) ($_GET['slug'] ?? '')]);
        $product = $stmt->fetch();
        if (!$product) respond(404, ['error' => 'Book not found']);
        respond(200, ['product' => public_product($product), 'checkoutEnabled' => gateway_ready()]);

    case 'create-order':
        need('POST');
        throttle('order', 12, 3600);
        if (!gateway_ready()) respond(503, ['error' => 'Online payment is not available yet.']);
        $body = json_body();
        $name = clean_line($body, 'name', 100);
        $email = strtolower(clean_line($body, 'email', 150));
        $phone = preg_replace('/[^0-9+]/', '', clean_line($body, 'phone', 20));
        if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(400, ['error' => 'Please enter your name and a valid email address.']);
        }

        $pdo = db();
        reconcile_stale_orders(3);
        $stmt = $pdo->prepare("SELECT * FROM products WHERE slug = ? AND status = 'active'");
        $stmt->execute([clean_line($body, 'slug', 120)]);
        $product = $stmt->fetch();
        if (!$product || empty($product['pdf_file'])) respond(404, ['error' => 'This book is not available for purchase.']);
        if ($product['currency'] !== 'INR') respond(400, ['error' => 'Unsupported currency.']);

        // Already bought: never hand the download link to whoever typed the email; send it to the inbox
        $stmt = $pdo->prepare("SELECT o.order_number FROM purchases pu JOIN orders o ON o.id = pu.order_id
                               WHERE pu.customer_email = ? AND pu.product_id = ? AND pu.revoked_at IS NULL AND o.payment_status = 'paid' LIMIT 1");
        $stmt->execute([$email, $product['id']]);
        if ($existing = $stmt->fetchColumn()) {
            send_purchase_email($existing);
            respond(200, ['alreadyPurchased' => true]);
        }

        // Duplicate Buy Now clicks reuse the open checkout instead of creating a second order
        $pdo->exec('BEGIN IMMEDIATE');
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE customer_email = ? AND product_id = ? AND payment_status = 'pending'
                               AND amount = ? AND checkout_url IS NOT NULL AND expires_at > ? ORDER BY id DESC LIMIT 1");
        $stmt->execute([$email, $product['id'], $product['price'], time() + 120]);
        if ($open = $stmt->fetch()) {
            $pdo->exec('COMMIT');
            respond(200, [
                'orderNumber' => $open['order_number'],
                'accessToken' => order_access_token($open['order_number']),
                'redirectUrl' => $open['checkout_url'],
            ]);
        }
        $orderNumber = 'SR-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(6)));
        $pdo->prepare('INSERT INTO orders (order_number, product_id, customer_name, customer_email, customer_phone, amount, currency,
                       expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([$orderNumber, $product['id'], $name, $email, $phone, $product['price'], $product['currency'],
                       time() + ORDER_EXPIRY_SECONDS, time(), time()]);
        $pdo->exec('COMMIT');

        [$status, $data] = phonepe_call('POST', '/checkout/v2/pay', [
            'merchantOrderId' => $orderNumber,
            'amount' => (int) $product['price'],
            'expireAfter' => ORDER_EXPIRY_SECONDS,
            'metaInfo' => ['udf1' => $product['slug']],
            'paymentFlow' => [
                'type' => 'PG_CHECKOUT',
                'message' => mb_substr('SanatanRoop: ' . $product['title'], 0, 100),
                'merchantUrls' => ['redirectUrl' => order_page_url($orderNumber)],
            ],
        ]);
        if ($status !== 200 || empty($data['redirectUrl'])) {
            if ($status === 0) {
                // Timeout: PhonePe may or may not have the order. Keep it pending; reconciliation settles it.
                respond(504, ['error' => 'The payment service did not respond. Please try again in a minute.']);
            }
            $pdo->prepare("UPDATE orders SET payment_status = 'failed', status_note = ?, updated_at = ? WHERE order_number = ?")
                ->execute(['gateway_rejected: ' . mb_substr((string) ($data['code'] ?? $data['message'] ?? $status), 0, 120), time(), $orderNumber]);
            respond(502, ['error' => 'Could not start the payment. Please try again.']);
        }
        $pdo->prepare('UPDATE orders SET gateway_order_id = ?, checkout_url = ?, expires_at = ?, updated_at = ? WHERE order_number = ?')
            ->execute([
                $data['orderId'] ?? null,
                $data['redirectUrl'],
                // expireAt comes in epoch milliseconds
                isset($data['expireAt']) ? (int) ($data['expireAt'] > 9999999999 ? $data['expireAt'] / 1000 : $data['expireAt']) : time() + ORDER_EXPIRY_SECONDS,
                time(),
                $orderNumber,
            ]);
        respond(200, [
            'orderNumber' => $orderNumber,
            'accessToken' => order_access_token($orderNumber),
            'redirectUrl' => $data['redirectUrl'],
        ]);

    case 'order-status':
        need('GET');
        $orderNumber = (string) ($_GET['o'] ?? '');
        if (!order_token_valid($orderNumber, $_GET['t'] ?? null)) respond(403, ['error' => 'Invalid order link']);
        // Never trust the browser's word that payment succeeded: ask PhonePe, then read the database
        reconcile_order($orderNumber);
        $stmt = db()->prepare('SELECT o.*, p.slug, p.title, pu.download_count, pu.download_limit, pu.revoked_at
                               FROM orders o JOIN products p ON p.id = o.product_id LEFT JOIN purchases pu ON pu.order_id = o.id
                               WHERE o.order_number = ?');
        $stmt->execute([$orderNumber]);
        $order = $stmt->fetch();
        if (!$order) respond(404, ['error' => 'Order not found']);
        $canDownload = $order['payment_status'] === 'paid' && $order['download_count'] !== null && !$order['revoked_at'];
        respond(200, [
            'orderNumber' => $order['order_number'],
            'status' => $order['payment_status'],
            'note' => $order['status_note'] === 'expired' ? 'expired' : '',
            'amount' => (int) $order['amount'],
            'product' => ['slug' => $order['slug'], 'title' => $order['title']],
            'canDownload' => $canDownload,
            'downloadsLeft' => $canDownload ? max(0, $order['download_limit'] - $order['download_count']) : 0,
            'checkoutUrl' => $order['payment_status'] === 'pending' && $order['expires_at'] > time() ? $order['checkout_url'] : null,
        ]);

    case 'resend-links':
        need('POST');
        throttle('resend', 5, 3600);
        $email = strtolower(clean_line(json_body(), 'email', 150));
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $stmt = db()->prepare("SELECT o.order_number FROM purchases pu JOIN orders o ON o.id = pu.order_id
                                   WHERE pu.customer_email = ? AND pu.revoked_at IS NULL AND o.payment_status = 'paid'");
            $stmt->execute([$email]);
            foreach ($stmt->fetchAll(PDO::FETCH_COLUMN) as $orderNumber) send_purchase_email($orderNumber);
        }
        // Same answer whether or not the email has purchases
        respond(200, ['ok' => true]);

    // ---------------------------------------------------------------- admin
    case 'admin-products':
        need('GET');
        require_admin();
        $rows = db()->query('SELECT p.*, (SELECT COUNT(*) FROM orders o WHERE o.product_id = p.id AND o.payment_status = \'paid\') AS sold
                             FROM products p ORDER BY p.created_at DESC')->fetchAll();
        respond(200, ['products' => $rows]);

    case 'save-product':
        need('POST');
        require_admin();
        $body = json_body();
        $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9-]+/', '-', clean_line($body, 'slug', 100)), '-'));
        $title = clean_line($body, 'title', 200);
        $price = (int) round(((float) ($body['priceRupees'] ?? 0)) * 100);
        $status = in_array($body['status'] ?? '', ['active', 'draft', 'archived'], true) ? $body['status'] : 'draft';
        if ($slug === '' || $title === '') respond(400, ['error' => 'Title and URL name are required.']);
        if ($price < 100) respond(400, ['error' => 'Price must be at least ₹1.']);
        $fields = [$slug, $title, mb_substr(trim((string) ($body['description'] ?? '')), 0, 5000), $price, clean_line($body, 'coverImage', 500), $status, time()];
        try {
            if (!empty($body['id'])) {
                db()->prepare('UPDATE products SET slug = ?, title = ?, description = ?, price = ?, cover_image = ?, status = ?, updated_at = ? WHERE id = ?')
                    ->execute([...$fields, (int) $body['id']]);
                $id = (int) $body['id'];
            } else {
                db()->prepare('INSERT INTO products (slug, title, description, price, cover_image, status, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
                    ->execute([...$fields, time()]);
                $id = (int) db()->lastInsertId();
            }
        } catch (PDOException $e) {
            respond(409, ['error' => 'Another book already uses this URL name.']);
        }
        respond(200, ['ok' => true, 'id' => $id]);

    case 'delete-product':
        need('POST');
        require_admin();
        $id = (int) (json_body()['id'] ?? 0);
        $stmt = db()->prepare('SELECT COUNT(*) FROM orders WHERE product_id = ?');
        $stmt->execute([$id]);
        if ($stmt->fetchColumn() > 0) {
            // Orders refer to it: hide it instead of breaking customers' purchases
            db()->prepare("UPDATE products SET status = 'archived', updated_at = ? WHERE id = ?")->execute([time(), $id]);
            respond(200, ['ok' => true, 'archived' => true]);
        }
        $stmt = db()->prepare('SELECT pdf_file FROM products WHERE id = ?');
        $stmt->execute([$id]);
        if ($file = $stmt->fetchColumn()) @unlink(private_dir() . '/books/' . basename($file));
        db()->prepare('DELETE FROM products WHERE id = ?')->execute([$id]);
        respond(200, ['ok' => true]);

    case 'upload-pdf':
        need('POST');
        require_admin();
        $id = (int) ($_POST['id'] ?? 0);
        $file = $_FILES['file'] ?? null;
        if (!$file || $file['error'] !== UPLOAD_ERR_OK) respond(400, ['error' => 'Upload failed or file too large']);
        if (file_get_contents($file['tmp_name'], false, null, 0, 5) !== '%PDF-') respond(400, ['error' => 'Only PDF files are allowed']);
        $stmt = db()->prepare('SELECT pdf_file FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $old = $stmt->fetchColumn();
        if ($old === false) respond(404, ['error' => 'Book not found']);
        $dir = private_dir() . '/books';
        if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) respond(500, ['error' => 'Storage unavailable']);
        $stored = bin2hex(random_bytes(16)) . '.pdf';
        if (!move_uploaded_file($file['tmp_name'], "$dir/$stored")) respond(500, ['error' => 'Could not save file']);
        db()->prepare('UPDATE products SET pdf_file = ?, pdf_name = ?, pdf_size = ?, updated_at = ? WHERE id = ?')
            ->execute([$stored, mb_substr(basename((string) $file['name']), 0, 150), (int) $file['size'], time(), $id]);
        if ($old) @unlink("$dir/" . basename($old));
        respond(200, ['ok' => true]);

    case 'admin-orders':
        need('GET');
        require_admin();
        reconcile_stale_orders(5);
        $where = '';
        $args = [];
        if (in_array($_GET['status'] ?? '', ['pending', 'paid', 'failed', 'cancelled', 'refunded'], true)) {
            $where = 'WHERE o.payment_status = ?';
            $args[] = $_GET['status'];
        }
        $stmt = db()->prepare("SELECT o.id, o.order_number, o.customer_name, o.customer_email, o.customer_phone, o.amount, o.currency,
                               o.payment_gateway, o.gateway_order_id, o.gateway_transaction_id, o.payment_status, o.status_note,
                               o.created_at, o.paid_at, p.title AS product_title, pu.download_count, pu.download_limit, pu.revoked_at
                               FROM orders o JOIN products p ON p.id = o.product_id LEFT JOIN purchases pu ON pu.order_id = o.id
                               $where ORDER BY o.id DESC LIMIT 300");
        $stmt->execute($args);
        $totals = db()->query("SELECT COUNT(*) AS paid_orders, COALESCE(SUM(amount), 0) AS revenue FROM orders WHERE payment_status = 'paid'")->fetch();
        respond(200, ['orders' => $stmt->fetchAll(), 'totals' => $totals]);

    case 'recheck-order':
        need('POST');
        require_admin();
        respond(200, ['status' => reconcile_order((string) (json_body()['orderNumber'] ?? ''))]);

    case 'set-access':
        need('POST');
        require_admin();
        $body = json_body();
        $order = find_order((string) ($body['orderNumber'] ?? ''));
        if (!$order) respond(404, ['error' => 'Order not found']);
        if (($body['change'] ?? '') === 'revoke') {
            db()->prepare('UPDATE purchases SET revoked_at = ? WHERE order_id = ?')->execute([time(), $order['id']]);
        } elseif (($body['change'] ?? '') === 'restore') {
            db()->prepare('UPDATE purchases SET revoked_at = NULL WHERE order_id = ?')->execute([$order['id']]);
        } elseif (($body['change'] ?? '') === 'reset-downloads') {
            db()->prepare('UPDATE purchases SET download_count = 0 WHERE order_id = ?')->execute([$order['id']]);
        } elseif (($body['change'] ?? '') === 'resend-email' && $order['payment_status'] === 'paid') {
            send_purchase_email($order['order_number']);
        } else {
            respond(400, ['error' => 'Unknown change']);
        }
        respond(200, ['ok' => true]);

    case 'gateway-settings':
        need('GET');
        require_admin();
        $c = gateway_config();
        // Secrets are write-only: only whether they are set is ever returned
        respond(200, [
            'environment' => $c['environment'] ?? 'sandbox',
            'clientId' => $c['client_id'] ?? '',
            'clientVersion' => $c['client_version'] ?? '',
            'hasClientSecret' => !empty($c['client_secret']),
            'webhookUsername' => $c['webhook_username'] ?? '',
            'hasWebhookPassword' => !empty($c['webhook_password']),
            'webhookUrl' => SITE_URL . '/api/phonepe-webhook.php',
            'ready' => gateway_ready(),
            'secureStorage' => private_dir_is_outside_webroot(),
        ]);

    case 'save-gateway-settings':
        need('POST');
        require_admin();
        $body = json_body();
        $c = gateway_config();
        $c['environment'] = ($body['environment'] ?? '') === 'production' ? 'production' : 'sandbox';
        $c['client_id'] = clean_line($body, 'clientId', 200);
        $c['client_version'] = clean_line($body, 'clientVersion', 20);
        $c['webhook_username'] = clean_line($body, 'webhookUsername', 100);
        // Empty secret fields keep the stored value
        if (clean_line($body, 'clientSecret', 300) !== '') $c['client_secret'] = clean_line($body, 'clientSecret', 300);
        if (clean_line($body, 'webhookPassword', 200) !== '') $c['webhook_password'] = clean_line($body, 'webhookPassword', 200);
        save_gateway_config($c);
        $ok = gateway_ready() && phonepe_token(true) !== null;
        respond(200, ['ok' => true, 'connected' => $ok]);

    default:
        respond(404, ['error' => 'Unknown action']);
}
