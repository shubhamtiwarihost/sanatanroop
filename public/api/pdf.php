<?php
// PDF proxy for the book reader: /api/pdf?url=<archive.org PDF link>
// archive.org sends no CORS headers, so the browser cannot fetch its PDFs directly.
// Streams the file through with Range support so PDF.js can load it page by page.

const MAX_REDIRECTS = 5;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS');
header('Access-Control-Allow-Headers: Range');
header('Access-Control-Expose-Headers: Content-Length, Content-Range, Accept-Ranges');
header('X-Content-Type-Options: nosniff');

function deny(int $status, string $message): void
{
    http_response_code($status);
    header('Content-Type: text/plain; charset=utf-8');
    header('Cache-Control: no-store');
    echo $message;
    exit;
}

// Only https://archive.org and its subdomains, so this never becomes an open proxy.
function allowed_url(string $url): bool
{
    $parts = parse_url($url);
    if (!$parts || strtolower($parts['scheme'] ?? '') !== 'https') return false;
    if (isset($parts['user']) || isset($parts['pass'])) return false;
    if (isset($parts['port']) && (int) $parts['port'] !== 443) return false;
    $host = strtolower($parts['host'] ?? '');
    return $host === 'archive.org' || substr($host, -12) === '.archive.org';
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') {
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}
if ($method !== 'GET' && $method !== 'HEAD') deny(405, 'Method not allowed');

// PHP has already decoded the query string once ("%2520" -> "%20"), which is the form archive.org expects.
$url = str_replace(' ', '%20', trim((string) ($_GET['url'] ?? '')));
if ($url === '') deny(400, 'Missing url');
if (!allowed_url($url)) deny(403, 'Only archive.org links are allowed.');

$range = $_SERVER['HTTP_RANGE'] ?? '';
if ($range !== '' && !preg_match('/^bytes=\d*-\d*$/', $range)) deny(416, 'Invalid range');

// Large files: no time limit, no buffering, no compression.
set_time_limit(0);
ini_set('display_errors', '0'); // a stray notice would corrupt the PDF stream
ini_set('zlib.output_compression', '0');
ini_set('output_buffering', '0');
if (function_exists('apache_setenv')) @apache_setenv('no-gzip', '1');
while (ob_get_level()) ob_end_clean();

$status = 0;
$upstream = [];
$headersSent = false;

$sendHeaders = function () use (&$status, &$upstream, &$headersSent): void {
    if ($headersSent) return;
    $headersSent = true;
    http_response_code($status);
    header('Content-Type: application/pdf');
    header('Accept-Ranges: bytes');
    header('Cache-Control: public, max-age=86400');
    header('Content-Encoding: identity');
    header('X-Accel-Buffering: no');
    foreach (['content-length' => 'Content-Length', 'content-range' => 'Content-Range', 'etag' => 'ETag', 'last-modified' => 'Last-Modified'] as $key => $name) {
        if (isset($upstream[$key])) header($name . ': ' . $upstream[$key]);
    }
};

for ($hop = 0; ; $hop++) {
    $status = 0;
    $upstream = [];
    $requestHeaders = ['Accept-Encoding: identity'];
    if ($range !== '') $requestHeaders[] = 'Range: ' . $range;

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_FOLLOWLOCATION => false, // redirects are followed by hand so every hop is host-checked
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_NOBODY => $method === 'HEAD',
        CURLOPT_HTTPHEADER => $requestHeaders,
        CURLOPT_USERAGENT => 'SanatanRoop-Reader/1.0 (+https://sanatanroop.com)',
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_LOW_SPEED_LIMIT => 1024,
        CURLOPT_LOW_SPEED_TIME => 30,
        CURLOPT_BUFFERSIZE => 65536,
        CURLOPT_HEADERFUNCTION => function ($ch, string $line) use (&$status, &$upstream): int {
            if (preg_match('#^HTTP/\S+\s+(\d{3})#', $line, $m)) {
                $status = (int) $m[1];
                $upstream = [];
            } elseif (strpos($line, ':') !== false) {
                [$name, $value] = explode(':', $line, 2);
                $upstream[strtolower(trim($name))] = trim($value);
            }
            return strlen($line);
        },
        CURLOPT_WRITEFUNCTION => function ($ch, string $chunk) use (&$status, $sendHeaders): int {
            if ($status !== 200 && $status !== 206) return strlen($chunk); // discard redirect and error bodies
            $sendHeaders();
            echo $chunk;
            flush();
            return connection_aborted() ? 0 : strlen($chunk);
        },
    ]);
    $ok = curl_exec($ch);

    if ($headersSent) exit; // body already streamed (or the reader went away mid-file)
    if (!$ok && $status === 0) deny(502, 'Could not reach archive.org. Please try again.');

    if ($status >= 300 && $status < 400 && isset($upstream['location'])) {
        if ($hop >= MAX_REDIRECTS) deny(502, 'Too many redirects from archive.org.');
        $next = $upstream['location'];
        if (strpos($next, '//') === 0) $next = 'https:' . $next;
        elseif (strpos($next, '/') === 0) $next = 'https://' . parse_url($url, PHP_URL_HOST) . $next;
        if (!allowed_url($next)) deny(403, 'Only archive.org links are allowed.');
        $url = $next;
        continue;
    }
    break;
}

if ($status === 200 || $status === 206) { // HEAD request or empty body
    $sendHeaders();
    exit;
}
if ($status === 404) deny(404, 'This PDF was not found on archive.org.');
if ($status === 416) deny(416, 'Requested range not satisfiable');
if ($status === 429 || $status === 503) header('Retry-After: ' . ($upstream['retry-after'] ?? '30'));
deny(502, "archive.org is temporarily unavailable (status $status). Please try again in a little while.");
