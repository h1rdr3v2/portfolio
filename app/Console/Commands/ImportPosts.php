<?php

namespace App\Console\Commands;

use App\Models\Post;
use Database\Seeders\PostSeeder;
use Illuminate\Console\Command;

/**
 * Adds the posts in `data/posts` that the database does not have yet. The
 * seeder only fills an empty table, so this is how a post added as a file
 * reaches a site that is already seeded. Rows that exist are left exactly as
 * the admin has them, and nothing is ever removed — but a post deleted in the
 * admin is "missing" too, so the command says what it is about to add and
 * asks first.
 */
class ImportPosts extends Command
{
    protected $signature = 'posts:import
        {slug?* : Only these slugs; every missing one when omitted}
        {--force : Add without asking}';

    protected $description = 'Insert posts from the seed files whose slug is not in the database yet';

    public function handle(): int
    {
        $wanted = $this->argument('slug');
        $existing = Post::query()->pluck('slug')->all();

        $missing = PostSeeder::fromFiles()
            ->reject(fn (array $post): bool => in_array($post['slug'], $existing, true))
            ->filter(fn (array $post): bool => $wanted === [] || in_array($post['slug'], $wanted, true))
            ->values();

        if ($missing->isEmpty()) {
            $this->info('Nothing to add: every post in the files is in the database.');

            return self::SUCCESS;
        }

        foreach ($missing as $post) {
            $this->line("  {$post['slug']} — {$post['title']}");
        }

        if (! $this->option('force') && ! $this->confirm("Add {$missing->count()} ".str('post')->plural($missing->count()).'?', true)) {
            $this->comment('Nothing added.');

            return self::SUCCESS;
        }

        $missing->each(fn (array $post) => Post::query()->create($post));
        $this->info("Added {$missing->count()} ".str('post')->plural($missing->count()).'.');

        return self::SUCCESS;
    }
}
