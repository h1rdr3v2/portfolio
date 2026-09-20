<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Reaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BlogTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_index_lists_only_published_posts_newest_first(): void
    {
        $older = Post::factory()->create(['published_at' => now()->subDays(3)]);
        $newer = Post::factory()->create(['published_at' => now()->subDay()]);
        Post::factory()->draft()->create();
        Post::factory()->scheduled()->create();

        $this->get('/blog')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('blog/index')
                ->has('posts', 2)
                ->where('posts.0.slug', $newer->slug)
                ->where('posts.1.slug', $older->slug),
            );
    }

    public function test_a_post_renders_its_html_and_neighbours(): void
    {
        $previous = Post::factory()->create(['published_at' => now()->subDays(3)]);
        $post = Post::factory()->create(['published_at' => now()->subDays(2), 'body' => "# Dup title\n\nHello *there*."]);
        $next = Post::factory()->create(['published_at' => now()->subDay()]);

        $this->get("/blog/{$post->slug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('blog/show')
                ->where('post.slug', $post->slug)
                ->where('post.html', "<p>Hello <em>there</em>.</p>\n")
                ->where('previous.slug', $previous->slug)
                ->where('next.slug', $next->slug)
                ->has('reactions', 6)
                ->where('meta.type', 'article'),
            );
    }

    public function test_list_rows_carry_the_top_reactions_and_comment_count(): void
    {
        $post = Post::factory()->create();
        Reaction::factory()->count(3)->for($post)->create(['emoji' => '🔥']);
        Reaction::factory()->for($post)->create(['emoji' => '👍']);
        Comment::factory()->count(2)->for($post)->create();

        $this->get('/blog')
            ->assertInertia(fn (Assert $page) => $page
                ->where('posts.0.reactionsCount', 4)
                ->where('posts.0.topReactions.0.emoji', '🔥')
                ->where('posts.0.topReactions.0.count', 3)
                ->where('posts.0.topReactions.1.emoji', '👍')
                ->where('posts.0.commentsCount', 2),
            );
    }

    public function test_a_view_is_counted_once_per_session(): void
    {
        $post = Post::factory()->create();

        $this->get("/blog/{$post->slug}")->assertOk();
        $this->get("/blog/{$post->slug}")->assertOk();

        $this->assertSame(1, $post->fresh()->views);
    }

    public function test_drafts_and_scheduled_posts_are_not_public(): void
    {
        $draft = Post::factory()->draft()->create();
        $scheduled = Post::factory()->scheduled()->create();

        $this->get("/blog/{$draft->slug}")->assertNotFound();
        $this->get("/blog/{$scheduled->slug}")->assertNotFound();
    }

    public function test_saving_a_post_renders_its_markdown_and_reading_time(): void
    {
        $post = Post::factory()->create(['body' => str_repeat('word ', 450)."\n\n```tsx\nconst a = 1\n```"]);

        $this->assertSame(2, $post->reading_minutes);
        $this->assertStringContainsString('<pre data-lang="ts"', $post->body_html);
    }
}
