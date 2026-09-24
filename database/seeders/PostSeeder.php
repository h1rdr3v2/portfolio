<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Symfony\Component\Yaml\Yaml;

/**
 * Loads `data/posts/<slug>.md` files with YAML frontmatter — the same format
 * the previous site used — so existing writing carries over as-is.
 *
 * Only into an empty table: once there is writing in the database the admin
 * owns it, and a reseed must not undo an edit or bring back a deleted post.
 */
class PostSeeder extends Seeder
{
    public function run(): void
    {
        if (Post::query()->exists()) {
            return;
        }

        self::fromFiles()->each(fn (array $post) => Post::query()->create($post));
    }

    /**
     * Every post in `data/posts`, as the attributes a Post is created with.
     *
     * @return Collection<int, array{slug: string, title: string, excerpt: string|null, body: string, tags: array<int, string>, published_at: Carbon|null}>
     */
    public static function fromFiles(): Collection
    {
        return collect(File::files(database_path('seeders/data/posts')))
            ->filter(fn ($file): bool => $file->getExtension() === 'md')
            ->map(function ($file): array {
                ['meta' => $meta, 'body' => $body] = self::parse($file->getContents());

                return [
                    'slug' => $file->getFilenameWithoutExtension(),
                    'title' => $meta['title'] ?? 'Untitled',
                    'excerpt' => $meta['excerpt'] ?? null,
                    'body' => $body,
                    'tags' => $meta['tags'] ?? [],
                    'published_at' => isset($meta['date']) ? now()->parse($meta['date']) : null,
                ];
            })
            ->values();
    }

    /**
     * @return array{meta: array<string, mixed>, body: string}
     */
    private static function parse(string $raw): array
    {
        if (! preg_match('/\A---\n(.*?)\n---\n(.*)\z/s', $raw, $match)) {
            return ['meta' => [], 'body' => $raw];
        }

        return ['meta' => Yaml::parse($match[1]) ?? [], 'body' => ltrim($match[2])];
    }
}
