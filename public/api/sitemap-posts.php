<?php
// Sitemap of posts written in the admin (the built sitemap.xml only knows the pre-built pages)
const SITE = 'https://sanatanroop.com';
header('Content-Type: application/xml; charset=UTF-8');
$raw = @file_get_contents(__DIR__ . '/data/cms-hindu_dharma_cms_articles.json');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach (json_decode($raw ?: '[]', true) ?: [] as $a) {
    if (($a['status'] ?? '') !== 'Published' || empty($a['slug']) || empty($a['content'])) continue;
    $loc = SITE . '/articles/' . rawurlencode($a['slug']) . '/';
    $time = strtotime($a['publishedDate'] ?? '');
    echo '<url><loc>' . htmlspecialchars($loc, ENT_XML1) . '</loc>' . ($time ? '<lastmod>' . date('Y-m-d', $time) . '</lastmod>' : '') . "</url>\n";
}
echo "</urlset>\n";
