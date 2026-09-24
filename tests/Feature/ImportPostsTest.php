<?php

namespace Tests\Feature;

use App\Models\Post;
use Database\Seeders\PostSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImportPostsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_adds_only_the_posts_the_database_is_missing(): void
    {
        $this->seed(PostSeeder::class);
        $total = Post::count();
        Post::query()->where('slug', 'telegram-referral-bot-case-study')->delete();
        $edited = Post::query()->where('slug', 'moving-mycgpa-to-expo')->firstOrFail();
        $edited->update(['title' => 'Edited in the admin']);

        $this->artisan('posts:import', ['--force' => true])
            ->expectsOutputToContain('telegram-referral-bot-case-study — How a referral bot')
            ->expectsOutputToContain('Added 1 post.')
            ->assertSuccessful();

        $this->assertSame($total, Post::count());
        $this->assertSame('Edited in the admin', $edited->fresh()->title);
    }

    public function test_it_can_be_limited_to_named_slugs(): void
    {
        $this->artisan('posts:import', ['slug' => ['telegram-referral-bot-case-study'], '--force' => true])
            ->expectsOutputToContain('Added 1 post.')
            ->assertSuccessful();

        $post = Post::query()->sole();
        $this->assertSame('telegram-referral-bot-case-study', $post->slug);
        $this->assertTrue($post->isPublished());
        $this->assertStringContainsString('<h2>The problem</h2>', $post->body_html);
    }

    public function test_it_asks_before_adding_and_adds_nothing_on_no(): void
    {
        $this->artisan('posts:import')
            ->expectsConfirmation('Add 4 posts?', 'no')
            ->expectsOutputToContain('Nothing added.')
            ->assertSuccessful();

        $this->assertSame(0, Post::count());
    }

    public function test_it_reports_when_there_is_nothing_to_add(): void
    {
        $this->seed(PostSeeder::class);

        $this->artisan('posts:import', ['--force' => true])
            ->expectsOutputToContain('Nothing to add')
            ->assertSuccessful();
    }
}
