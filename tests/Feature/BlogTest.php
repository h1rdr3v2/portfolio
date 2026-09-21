<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Reaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Vite;
use Tests\TestCase;

class BlogTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_index_lists_only_published_posts_newest_first(): void
    {
        $older = Post::factory()->create(['published_at' => now()->subDays(3), 'title' => 'Older post']);
        $newer = Post::factory()->create(['published_at' => now()->subDay(), 'title' => 'Newer post']);
        Post::factory()->draft()->create(['title' => 'Draft post']);
        Post::factory()->scheduled()->create(['title' => 'Scheduled post']);

        $this->get('/blog')
            ->assertOk()
            ->assertViewHas('posts', fn ($posts) => $posts->pluck('slug')->all() === [$newer->slug, $older->slug])
            ->assertSeeInOrder(['Newer post', 'Older post'])
            ->assertDontSee('Draft post')
            ->assertDontSee('Scheduled post');
    }

    public function test_a_post_renders_its_html_and_neighbours(): void
    {
        $previous = Post::factory()->create(['published_at' => now()->subDays(3), 'title' => 'The one before']);
        $post = Post::factory()->create(['published_at' => now()->subDays(2), 'body' => "# Dup title\n\nHello *there*."]);
        $next = Post::factory()->create(['published_at' => now()->subDay(), 'title' => 'The one after']);

        $this->get("/blog/{$post->slug}")
            ->assertOk()
            ->assertViewIs('blog.show')
            ->assertViewHas('previous', fn ($p) => $p->is($previous))
            ->assertViewHas('next', fn ($n) => $n->is($next))
            ->assertSee('<p>Hello <em>there</em>.</p>', false)
            ->assertSee('property="og:type" content="article"', false)
            ->assertSee('The one before')
            ->assertSee('The one after')
            ->assertSeeLivewire('post-reactions')
            ->assertSeeLivewire('post-comments');
    }

    public function test_list_rows_carry_the_top_reactions_and_comment_count(): void
    {
        $post = Post::factory()->create();
        Reaction::factory()->count(3)->for($post)->create(['emoji' => '🔥']);
        Reaction::factory()->for($post)->create(['emoji' => '👍']);
        Comment::factory()->count(2)->for($post)->create();

        $this->get('/blog')
            ->assertOk()
            ->assertSee('🔥 3')
            ->assertSee('👍 1')
            ->assertSee('2 comments');
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

    public function test_the_404_page_is_bare_but_in_the_site_s_frame(): void
    {
        $this->get('/nope')
            ->assertNotFound()
            ->assertSee("This page doesn't exist.")
            ->assertSee('Go home')
            ->assertSee(Vite::asset('resources/css/app.css'), false)
            ->assertDontSee(config('site.location'))
            ->assertDontSee('signature-crop', false)
            ->assertDontSee('>RSS<', false);
    }

    public function test_saving_a_post_renders_its_markdown_and_reading_time(): void
    {
        $post = Post::factory()->create(['body' => str_repeat('word ', 450)."\n\n```tsx\nconst a = 1\n```"]);

        $this->assertSame(2, $post->reading_minutes);
        $this->assertStringContainsString('<pre data-lang="ts"', $post->body_html);
    }
}
