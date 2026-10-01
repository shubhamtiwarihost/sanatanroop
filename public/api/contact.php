<?php
// POST {name, email, phone, subject, message} -> stores the message and emails it to the site owner
// GET (admin) -> {messages: [...]} newest first
require __DIR__ . '/_lib.php';

const CONTACT_RECIPIENTS = 'contact@sanatanroop.com, shubhamtiwarihost@gmail.com';

ensure_data_dir();
$store = DATA_DIR . '/contact-messages.jsonl';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require_admin();
    $lines = is_file($store) ? file($store, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) : [];
    respond(200, ['messages' => array_reverse(array_values(array_filter(array_map(fn($l) => json_decode($l, true), $lines))))]);
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['error' => 'Method not allowed']);

// Throttle: max 5 messages per IP per hour
$throttleFile = DATA_DIR . '/contact-throttle-' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.txt';
$sent = array_filter(
    is_file($throttleFile) ? explode("\n", (string) file_get_contents($throttleFile)) : [],
    fn($t) => (int) $t > time() - 3600
);
if (count($sent) >= 5) respond(429, ['error' => 'Too many messages. Please try again later.']);

$body = json_body();
// Single-line fields must not contain line breaks (they are used in email headers)
$line = fn($key, $max) => mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string) ($body[$key] ?? ''))), 0, $max);
$name = $line('name', 100);
$email = $line('email', 150);
$phone = $line('phone', 30);
$subject = $line('subject', 150);
$message = mb_substr(trim((string) ($body['message'] ?? '')), 0, 5000);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['error' => 'Please enter your name, a valid email and a message.']);
}

$entry = [
    'id' => bin2hex(random_bytes(6)),
    'date' => gmdate('c'),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'subject' => $subject,
    'message' => $message,
];
if (file_put_contents($store, json_encode($entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) === false) {
    respond(500, ['error' => 'Could not save your message. Please email us directly.']);
}
$sent[] = time();
file_put_contents($throttleFile, implode("\n", $sent), LOCK_EX);

// Email is best effort; the message is already stored
$mailed = @mail(
    CONTACT_RECIPIENTS,
    '=?UTF-8?B?' . base64_encode('[SanatanRoop] ' . ($subject ?: 'Contact form')) . '?=',
    "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\n$message\n",
    "From: SanatanRoop <noreply@sanatanroop.com>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8"
);

respond(200, ['ok' => true, 'mailed' => $mailed]);
