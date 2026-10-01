<?php
// POST (admin) multipart "file" (PDF or image) -> {url}
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['error' => 'Method not allowed']);
require_admin();

$file = $_FILES['file'] ?? null;
if (!$file || $file['error'] !== UPLOAD_ERR_OK) respond(400, ['error' => 'Upload failed or file too large']);

// Type is decided from the file contents, never from the uploaded name
$imageTypes = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp', IMAGETYPE_GIF => 'gif'];
if (file_get_contents($file['tmp_name'], false, null, 0, 5) === '%PDF-') {
    $ext = 'pdf';
} else {
    $info = @getimagesize($file['tmp_name']);
    $ext = $info ? ($imageTypes[$info[2]] ?? null) : null;
    if (!$ext) respond(400, ['error' => 'Only PDF, JPG, PNG, WebP or GIF files are allowed']);
}

$dir = __DIR__ . '/uploads';
if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) respond(500, ['error' => 'Storage unavailable']);

$name = date('Ymd') . '-' . bin2hex(random_bytes(8)) . '.' . $ext;
if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $name)) respond(500, ['error' => 'Could not save file']);
respond(200, ['url' => '/api/uploads/' . $name]);
