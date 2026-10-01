<?php
// PhonePe server-to-server notifications. Configure this URL with a username and password in the
// PhonePe dashboard; PhonePe then sends Authorization: SHA256(username:password).
require __DIR__ . '/_shop.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['error' => 'Method not allowed']);

$config = gateway_config();
if (empty($config['webhook_username']) || empty($config['webhook_password'])) respond(503, ['error' => 'Webhook not configured']);

$received = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
if ($received === '' && function_exists('getallheaders')) {
    foreach (getallheaders() as $name => $value) {
        if (strtolower($name) === 'authorization') $received = $value;
    }
}
$expected = hash('sha256', $config['webhook_username'] . ':' . $config['webhook_password']);
$received = strtolower(trim(preg_replace('/^SHA256\s+/i', '', $received)));
if (!hash_equals($expected, $received)) respond(401, ['error' => 'Unauthorized']);

$raw = file_get_contents('php://input') ?: '';
$body = json_decode($raw, true);
if (!is_array($body)) respond(400, ['error' => 'Invalid payload']);

$event = (string) ($body['event'] ?? '');
$payload = is_array($body['payload'] ?? null) ? $body['payload'] : [];
$isRefund = strpos($event, 'pg.refund.') === 0;
$orderNumber = (string) ($isRefund ? ($payload['originalMerchantOrderId'] ?? '') : ($payload['merchantOrderId'] ?? ''));

// The same notification can arrive many times; record it once
$eventKey = hash('sha256', $event . '|' . $orderNumber . '|' . ($payload['state'] ?? '') . '|' . ($payload['refundId'] ?? $payload['orderId'] ?? ''));
db()->prepare('INSERT OR IGNORE INTO webhook_events (event_key, event, order_number, received_at) VALUES (?, ?, ?, ?)')
    ->execute([$eventKey, mb_substr($event, 0, 60), mb_substr($orderNumber, 0, 80), time()]);

if ($orderNumber !== '' && find_order($orderNumber)) {
    if ($isRefund) {
        if ($event === 'pg.refund.completed' && ($payload['state'] ?? '') === 'COMPLETED') {
            mark_refunded($orderNumber, 'refund ' . mb_substr((string) ($payload['refundId'] ?? ''), 0, 60));
        }
    } else {
        // The notification is only a trigger. The order is updated from PhonePe's status API,
        // so a forged or replayed body cannot mark anything as paid.
        reconcile_order($orderNumber);
    }
}

// Always acknowledge an authenticated notification so PhonePe stops retrying
respond(200, ['ok' => true]);
