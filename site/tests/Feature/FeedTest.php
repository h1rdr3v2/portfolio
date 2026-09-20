<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FeedTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_rss_feed_lists_published_posts(): void
    {
        $post = Post::factory()->create(['title' => 'Feed me']);
        Post::factory()->draft()->create(['title' => 'Not yet']);

        $this->get('/rss.xml')
            ->assertOk()
            ->assertHeader('Content-Type', 'application/rss+xml; charset=UTF-8')
            ->assertSee('<title>Feed me</title>', false)
            ->assertSee(route('blog.show', $post->slug), false)
            ->assertDontSee('Not yet');
    }
}
