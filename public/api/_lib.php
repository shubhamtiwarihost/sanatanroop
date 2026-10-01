<?php
// Shared helpers for the SanatanRoop CMS API (file-based storage, single admin).

const DATA_DIR = __DIR__ . '/data';
const TOKEN_TTL = 7 * 24 * 3600;
const KEY_PATTERN = '/^(hindu_dharma_cms_|sanatan_cms_|sanatan_live_festival$)[a-z_]{0,48}$/';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-LiteSpeed-Cache-Control: no-cache');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ensure_data_dir(): void
{
    if (!is_dir(DATA_DIR) && !mkdir(DATA_DIR, 0755, true) && !is_dir(DATA_DIR)) {
        respond(500, ['error' => 'Storage unavailable']);
    }
    $guard = DATA_DIR . '/.htaccess';
    if (!is_file($guard)) {
        file_put_contents($guard, "Require all denied\nDeny from all\n");
    }
}

function secret(): string
{
    ensure_data_dir();
    $file = DATA_DIR . '/secret.php';
    if (!is_file($file)) {
        file_put_contents($file, "<?php return '" . bin2hex(random_bytes(32)) . "';\n", LOCK_EX);
    }
    return require $file;
}

function b64url(string $raw): string
{
    return rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
}

function issue_token(): string
{
    $payload = b64url(json_encode(['exp' => time() + TOKEN_TTL]));
    return $payload . '.' . b64url(hash_hmac('sha256', $payload, secret(), true));
}

function token_valid(?string $token): bool
{
    if (!$token || substr_count($token, '.') !== 1) return false;
    [$payload, $sig] = explode('.', $token);
    if (!hash_equals(b64url(hash_hmac('sha256', $payload, secret(), true)), $sig)) return false;
    $data = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
    return is_array($data) && ($data['exp'] ?? 0) > time();
}

function require_admin(): void
{
    if (!token_valid($_SERVER['HTTP_X_ADMIN_TOKEN'] ?? null)) {
        respond(401, ['error' => 'Unauthorized']);
    }
}

function json_body(): array
{
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    if (!is_array($data)) respond(400, ['error' => 'Invalid JSON body']);
    return $data;
}
