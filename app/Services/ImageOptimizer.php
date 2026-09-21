<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

/**
 * Re-encodes an image uploaded to the public disk as WebP and returns the new
 * relative path. Uploads from the admin come in as whatever the phone or the
 * design tool exported — usually a PNG several times larger than it needs to
 * be for a 640px column.
 */
class ImageOptimizer
{
    private const int MAX_EDGE = 1600;

    private const int QUALITY = 82;

    public function toWebp(string $relativePath): string
    {
        if (str_starts_with($relativePath, '/') || str_starts_with($relativePath, 'http')) {
            return $relativePath;
        }

        $disk = Storage::disk('public');
        $extension = strtolower(pathinfo($relativePath, PATHINFO_EXTENSION));

        if ($extension === 'webp' || ! in_array($extension, ['png', 'jpg', 'jpeg'], true) || ! $disk->exists($relativePath)) {
            return $relativePath;
        }

        $source = $disk->path($relativePath);
        $image = $extension === 'png' ? @imagecreatefrompng($source) : @imagecreatefromjpeg($source);

        if ($image === false) {
            return $relativePath;
        }

        if ($extension === 'png') {
            imagepalettetotruecolor($image);
            imagealphablending($image, true);
            imagesavealpha($image, true);
        }

        $image = $this->constrain($image);

        $target = preg_replace('/\.[^.]+$/', '.webp', $relativePath) ?? $relativePath.'.webp';
        $written = imagewebp($image, $disk->path($target), self::QUALITY);
        imagedestroy($image);

        if (! $written) {
            return $relativePath;
        }

        $disk->delete($relativePath);

        return $target;
    }

    private function constrain(\GdImage $image): \GdImage
    {
        $width = imagesx($image);
        $height = imagesy($image);
        $longest = max($width, $height);

        if ($longest <= self::MAX_EDGE) {
            return $image;
        }

        $scale = self::MAX_EDGE / $longest;
        $resized = imagescale($image, (int) round($width * $scale), (int) round($height * $scale), IMG_BICUBIC);

        if ($resized === false) {
            return $image;
        }

        imagedestroy($image);

        return $resized;
    }
}
