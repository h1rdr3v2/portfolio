<?php

namespace Tests\Feature;

use App\Livewire\PostComments;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_reader_can_leave_a_comment(): void
    {
        $post = Post::factory()->create();

        Livewire::test(PostComments::class, ['post' => $post])
            ->set('open', true)
            ->set('name', '  Obiabo ')
            ->set('body', 'Nice one.')
            ->call('send')
            ->assertHasNoErrors()
            ->assertSet('open', false)
            ->assertSet('body', '')
            ->assertSee('Obiabo')
            ->assertSee('Nice one.');

        $this->assertDatabaseHas('comments', ['post_id' => $post->id, 'name' => 'Obiabo', 'body' => 'Nice one.']);
    }

    public function test_the_honeypot_rejects_bots(): void
    {
        $post = Post::factory()->create();

        Livewire::test(PostComments::class, ['post' => $post])
            ->set('name', 'Bot')
            ->set('body', 'Buy now')
            ->set('website', 'http://spam')
            ->call('send')
            ->assertHasErrors('website');

        $this->assertDatabaseCount('comments', 0);
    }

    public function test_name_and_body_are_required(): void
    {
        $post = Post::factory()->create();

        Livewire::test(PostComments::class, ['post' => $post])
            ->call('send')
            ->assertHasErrors(['name', 'body']);
    }
}
