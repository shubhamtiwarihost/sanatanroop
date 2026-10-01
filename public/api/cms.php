<?php
// GET -> {data: {key: value}}   |   POST (admin) {key, value} saves, {key, value: null} deletes, {reset: true} clears all
require __DIR__ . '/_lib.php';

ensure_data_dir();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $parts = [];
    foreach (glob(DATA_DIR . '/cms-*.json') ?: [] as $file) {
        $key = substr(basename($file, '.json'), 4);
        $raw = file_get_contents($file);
        if ($raw !== false && $raw !== '') $parts[] = json_encode($key) . ':' . $raw;
    }
    echo '{"data":{' . implode(',', $parts) . '}}';
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['error' => 'Method not allowed']);

require_admin();
$body = json_body();

if (!empty($body['reset'])) {
    foreach (glob(DATA_DIR . '/cms-*.json') ?: [] as $file) unlink($file);
    respond(200, ['ok' => true]);
}

$key = (string) ($body['key'] ?? '');
if (!preg_match(KEY_PATTERN, $key)) respond(400, ['error' => 'Invalid key']);
$file = DATA_DIR . '/cms-' . $key . '.json';

if (!array_key_exists('value', $body) || $body['value'] === null) {
    if (is_file($file)) unlink($file);
    respond(200, ['ok' => true]);
}

$tmp = $file . '.' . bin2hex(random_bytes(4)) . '.tmp';
$json = json_encode($body['value'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if ($json === false || file_put_contents($tmp, $json, LOCK_EX) === false || !rename($tmp, $file)) {
    @unlink($tmp);
    respond(500, ['error' => 'Could not save']);
}
respond(200, ['ok' => true]);
