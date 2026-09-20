<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_reader_can_leave_a_comment(): void
    {
        $post = Post::factory()->create();

        $this->from("/blog/{$post->slug}")
            ->post("/blog/{$post->slug}/comments", ['name' => '  Obiabo ', 'body' => 'Nice one.'])
            ->assertRedirect("/blog/{$post->slug}")
            ->assertSessionHas('status', 'comment-posted');

        $this->assertDatabaseHas('comments', ['post_id' => $post->id, 'name' => 'Obiabo', 'body' => 'Nice one.']);

        $this->get("/blog/{$post->slug}")
            ->assertInertia(fn ($page) => $page->has('comments', 1)->where('comments.0.name', 'Obiabo'));
    }

    public function test_the_honeypot_rejects_bots(): void
    {
        $post = Post::factory()->create();

        $this->post("/blog/{$post->slug}/comments", ['name' => 'Bot', 'body' => 'Buy now', 'website' => 'http://spam'])
            ->assertSessionHasErrors('website');

        $this->assertDatabaseCount('comments', 0);
    }

    public function test_name_and_body_are_required(): void
    {
        $post = Post::factory()->create();

        $this->post("/blog/{$post->slug}/comments", [])
            ->assertSessionHasErrors(['name', 'body']);
    }
}
