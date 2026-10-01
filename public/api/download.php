<?php
// Protected PDF download: /download/book/<slug>?o=<order>&t=<token>
// Served only when the database shows a paid, unrevoked purchase for this order and book.
require __DIR__ . '/_shop.php';

function deny(int $status, string $message): void
{
    http_response_code($status);
    header('Content-Type: text/plain; charset=utf-8');
    echo $message;
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') deny(405, 'Method not allowed');

$slug = (string) ($_GET['book'] ?? '');
$orderNumber = (string) ($_GET['o'] ?? '');

$stmt = db()->prepare('SELECT * FROM products WHERE slug = ?');
$stmt->execute([$slug]);
$product = $stmt->fetch();
if (!$product || empty($product['pdf_file'])) deny(404, 'Not found');

if (!order_token_valid($orderNumber, $_GET['t'] ?? null)) deny(403, 'You do not have access to this file.');

$stmt = db()->prepare("SELECT pu.* FROM purchases pu JOIN orders o ON o.id = pu.order_id
                       WHERE o.order_number = ? AND pu.product_id = ? AND o.payment_status = 'paid' AND pu.revoked_at IS NULL");
$stmt->execute([$orderNumber, $product['id']]);
$purchase = $stmt->fetch();
if (!$purchase) deny(403, 'You do not have access to this file.');
if ($purchase['download_count'] >= $purchase['download_limit']) {
    deny(403, 'Download limit reached for this purchase. Please contact us.');
}

$path = private_dir() . '/books/' . basename($product['pdf_file']);
if (!is_file($path)) deny(404, 'Not found');

db()->prepare('UPDATE purchases SET download_count = download_count + 1 WHERE id = ?')->execute([$purchase['id']]);

$filename = preg_replace('/[^A-Za-z0-9._-]+/', '-', $product['slug']) . '.pdf';
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . filesize($path));
header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, no-store, max-age=0');
header('X-Robots-Tag: noindex');
header('Referrer-Policy: no-referrer');
while (ob_get_level()) ob_end_clean();
readfile($path);
