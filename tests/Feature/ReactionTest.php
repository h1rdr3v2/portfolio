<?php

namespace Tests\Feature;

use App\Livewire\PostReactions;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class ReactionTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_reaction_toggles_on_and_off_for_the_same_reader(): void
    {
        $post = Post::factory()->create();

        $component = Livewire::test(PostReactions::class, ['post' => $post]);

        $component->call('toggle', '🔥');
        $this->assertDatabaseCount('reactions', 1);
        $component->assertViewHas('reactions', fn ($reactions) => $reactions->firstWhere('emoji', '🔥')['count'] === 1
            && $reactions->firstWhere('emoji', '🔥')['mine'] === true
            && $reactions->firstWhere('emoji', '👍')['mine'] === false);

        $component->call('toggle', '🔥');
        $this->assertDatabaseCount('reactions', 0);
    }

    public function test_only_the_known_emojis_are_accepted(): void
    {
        $post = Post::factory()->create();

        Livewire::test(PostReactions::class, ['post' => $post])->call('toggle', '🍕');

        $this->assertDatabaseCount('reactions', 0);
    }

    public function test_drafts_cannot_be_reacted_to(): void
    {
        $post = Post::factory()->draft()->create();

        Livewire::test(PostReactions::class, ['post' => $post])->call('toggle', '🔥');

        $this->assertDatabaseCount('reactions', 0);
    }
}
