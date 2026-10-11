<?php
// Serves an admin-written post: the post viewer page with the post's own title, description,
// canonical and text in the HTML, so search engines see a distinct page (404 for unknown slugs).
const DATA_DIR = __DIR__ . '/data';
const SITE = 'https://sanatanroop.com';

$slug = (string) ($_GET['slug'] ?? '');
$raw = @file_get_contents(DATA_DIR . '/cms-hindu_dharma_cms_articles.json');
$post = null;
foreach (json_decode($raw ?: '[]', true) ?: [] as $a) {
    if (($a['slug'] ?? null) === $slug && ($a['status'] ?? '') === 'Published') { $post = $a; break; }
}

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: public, max-age=0, must-revalidate');
$root = dirname(__DIR__);
if (!$post) {
    http_response_code(404);
    readfile($root . '/404.html');
    exit;
}

$h = fn($s) => htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
$url = SITE . '/articles/' . rawurlencode($slug) . '/';
$title = ($post['seoTitle'] ?? '') ?: $post['title'];
$desc = ($post['seoDescription'] ?? '') ?: ($post['excerpt'] ?? '');
$image = $post['image'] ?? '';
if ($image && $image[0] === '/') $image = SITE . $image;

$html = file_get_contents($root . '/articles/post/index.html');
$html = preg_replace('#<title>.*?</title>#s', '<title>' . $h($title) . ' | SanatanRoop</title>', $html, 1);
$html = preg_replace('#<meta name="description" content="[^"]*"/?>#', '<meta name="description" content="' . $h($desc) . '"/>', $html, 1);
$html = preg_replace('#<meta property="og:(title|description|url|type)"[^>]*>#', '', $html);
if ($image) $html = preg_replace('#<meta property="og:image(:[a-z]+)?"[^>]*>#', '', $html);
$head = '<link rel="canonical" href="' . $h($url) . '"/>'
    . '<meta property="og:title" content="' . $h($title) . '"/>'
    . '<meta property="og:description" content="' . $h($desc) . '"/>'
    . '<meta property="og:url" content="' . $h($url) . '"/>'
    . '<meta property="og:type" content="article"/>'
    . ($image ? '<meta property="og:image" content="' . $h($image) . '"/>' : '');
$html = preg_replace('#</head>#', $head . '</head>', $html, 1);

// Post text for crawlers that don't run JavaScript; the app renders the real page over it
$body = $post['content'] ?? '';
if ($body !== '' && strpos($body, '<') === false) $body = '<p>' . nl2br($h($body)) . '</p>';
$body = strip_tags($body, '<p><br><h2><h3><h4><strong><b><em><i><ul><ol><li><blockquote><a><img><figure><figcaption><table><tr><th><td>');
$html = preg_replace('#<body([^>]*)>#', '<body$1><noscript><article><h1>' . $h($post['title']) . '</h1>' . $body . '</article></noscript>', $html, 1);
echo $html;
