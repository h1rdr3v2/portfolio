<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReactionTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_reaction_toggles_on_and_off_for_the_same_reader(): void
    {
        $post = Post::factory()->create();

        $this->from("/blog/{$post->slug}")
            ->post("/blog/{$post->slug}/reactions", ['emoji' => '🔥'])
            ->assertRedirect("/blog/{$post->slug}");
        $this->assertDatabaseCount('reactions', 1);

        $this->post("/blog/{$post->slug}/reactions", ['emoji' => '🔥']);
        $this->assertDatabaseCount('reactions', 0);
    }

    public function test_the_page_reports_which_reactions_are_mine(): void
    {
        $post = Post::factory()->create();
        $this->post("/blog/{$post->slug}/reactions", ['emoji' => '❤️']);

        $this->get("/blog/{$post->slug}")
            ->assertInertia(fn ($page) => $page
                ->where('reactions.1.emoji', '❤️')
                ->where('reactions.1.count', 1)
                ->where('reactions.1.mine', true)
                ->where('reactions.0.mine', false),
            );
    }

    public function test_only_the_known_emojis_are_accepted(): void
    {
        $post = Post::factory()->create();

        $this->post("/blog/{$post->slug}/reactions", ['emoji' => '🍕'])
            ->assertSessionHasErrors('emoji');
    }

    public function test_drafts_cannot_be_reacted_to(): void
    {
        $post = Post::factory()->draft()->create();

        $this->post("/blog/{$post->slug}/reactions", ['emoji' => '🔥'])->assertNotFound();
    }
}
