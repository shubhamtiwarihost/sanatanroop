<?php
// POST {email, password} -> {token}   |   GET with X-Admin-Token -> session check
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require_admin();
    respond(200, ['ok' => true]);
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['error' => 'Method not allowed']);

// Throttle: max 10 failed attempts per IP per 15 minutes
ensure_data_dir();
$throttleFile = DATA_DIR . '/throttle-' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.txt';
$fails = array_filter(
    is_file($throttleFile) ? explode("\n", (string) file_get_contents($throttleFile)) : [],
    fn($t) => (int) $t > time() - 900
);
if (count($fails) >= 10) respond(429, ['error' => 'Too many attempts. Try again in 15 minutes.']);

$body = json_body();
$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');

// Must match src/lib/adminAuth.ts and scripts/set-admin-password.mjs
$hash = hash_pbkdf2('sha256', $password, 'sanatanroop-admin:' . $email, 310000, 64);

if (!hash_equals(require __DIR__ . '/admin-hash.php', $hash)) {
    $fails[] = time();
    file_put_contents($throttleFile, implode("\n", $fails), LOCK_EX);
    respond(401, ['error' => 'Invalid email or password']);
}

@unlink($throttleFile);
respond(200, ['token' => issue_token()]);
