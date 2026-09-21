<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Symfony\Component\Yaml\Yaml;

/**
 * Loads `data/posts/<slug>.md` files with YAML frontmatter — the same format
 * the previous site used — so existing writing carries over as-is.
 */
class PostSeeder extends Seeder
{
    public function run(): void
    {
        foreach (File::files(database_path('seeders/data/posts')) as $file) {
            if ($file->getExtension() !== 'md') {
                continue;
            }

            ['meta' => $meta, 'body' => $body] = $this->parse($file->getContents());

            Post::query()->updateOrCreate(
                ['slug' => $file->getFilenameWithoutExtension()],
                [
                    'title' => $meta['title'] ?? 'Untitled',
                    'excerpt' => $meta['excerpt'] ?? null,
                    'body' => $body,
                    'tags' => $meta['tags'] ?? [],
                    'published_at' => isset($meta['date']) ? now()->parse($meta['date']) : null,
                ],
            );
        }
    }

    /**
     * @return array{meta: array<string, mixed>, body: string}
     */
    private function parse(string $raw): array
    {
        if (! preg_match('/\A---\n(.*?)\n---\n(.*)\z/s', $raw, $match)) {
            return ['meta' => [], 'body' => $raw];
        }

        return ['meta' => Yaml::parse($match[1]) ?? [], 'body' => ltrim($match[2])];
    }
}
