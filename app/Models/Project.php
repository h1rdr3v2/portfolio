<?php

namespace App\Models;

use App\Enums\ProjectCategory;
use App\Services\ImageOptimizer;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

/**
 * @property array<int, string>|null $tools
 * @property array<string, string>|null $links
 * @property array<int, string>|null $images
 */
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'description',
        'story',
        'tools',
        'links',
        'images',
        'year',
        'is_featured',
        'featured_order',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'category' => ProjectCategory::class,
            'tools' => 'array',
            'links' => 'array',
            'images' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    /** Uploaded screenshots are stored as WebP, whatever they arrived as. */
    protected static function booted(): void
    {
        static::saving(function (Project $project): void {
            if ($project->isDirty('images') && is_array($project->images)) {
                $optimizer = app(ImageOptimizer::class);
                $project->images = array_map(fn (string $path): string => $optimizer->toWebp($path), $project->images);
            }
        });
    }

    #[Scope]
    protected function featured(Builder $query): Builder
    {
        return $query->where('is_featured', true)->orderBy('featured_order')->orderBy('sort_order');
    }

    #[Scope]
    protected function notFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', false)->orderBy('sort_order')->orderBy('id');
    }

    /**
     * The screenshots with their pixel size, so the page can lay a frame out
     * before the images arrive and tell a phone shot from a desktop one.
     *
     * Seeded images live under `public/images` and are stored as absolute
     * paths; uploads from the admin are stored on the public disk as relative
     * paths and resolved through it.
     *
     * @return array<int, array{url: string, width: int|null, height: int|null}>
     */
    public function imageEntries(): array
    {
        return array_map(function (string $path): array {
            $isAbsolute = str_starts_with($path, '/') || str_starts_with($path, 'http');
            $url = $isAbsolute ? $path : Storage::disk('public')->url($path);
            $file = str_starts_with($path, 'http')
                ? null
                : ($isAbsolute ? public_path($path) : Storage::disk('public')->path($path));

            [$width, $height] = $file ? $this->imageSize($file) : [null, null];

            return ['url' => $url, 'width' => $width, 'height' => $height];
        }, $this->images ?? []);
    }

    /**
     * @return array{0: int|null, 1: int|null}
     */
    private function imageSize(string $file): array
    {
        if (! is_file($file)) {
            return [null, null];
        }

        // Keyed on the modification time too, so replacing a screenshot at the
        // same path does not keep serving the old dimensions for a day.
        $key = 'image-size:'.md5($file.'|'.filemtime($file));

        return Cache::remember($key, now()->addDay(), function () use ($file): array {
            $size = @getimagesize($file);

            return $size ? [$size[0], $size[1]] : [null, null];
        });
    }

    /** What a list row says about the project: the description, or the story's first sentence. */
    public function summary(): string
    {
        if ($this->description) {
            return $this->description;
        }

        preg_match('/^.*?[.!?](?=\s|$)/', $this->story, $match);

        return $match[0] ?? $this->story;
    }

    /**
     * Links in display order — stores first, source last — with a label and icon each.
     *
     * @return array<int, array{url: string, label: string, icon: string}>
     */
    public function linkButtons(): array
    {
        $kinds = [
            'appstore' => ['App Store', 'apple'],
            'playstore' => ['Play Store', 'play'],
            'website' => ['Website', 'globe'],
            'telegram' => ['Telegram', 'telegram'],
            'whatsapp' => ['WhatsApp', 'whatsapp'],
            'github' => ['GitHub', 'github'],
        ];

        $buttons = [];
        foreach ($kinds as $kind => [$label, $icon]) {
            if (! empty($this->links[$kind])) {
                $buttons[] = ['url' => $this->links[$kind], 'label' => $label, 'icon' => $icon];
            }
        }

        return $buttons;
    }
}
