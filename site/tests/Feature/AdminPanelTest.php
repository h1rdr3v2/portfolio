<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Project;
use App\Models\Role;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_sent_to_the_login_page(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
        $this->get('/admin/posts')->assertRedirect('/admin/login');
    }

    public function test_every_resource_page_renders_for_the_admin(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $project = Project::factory()->create();
        $role = Role::factory()->create();
        $snippet = Snippet::factory()->create(['key' => 'now']);
        Comment::factory()->for($post)->create();

        $pages = [
            '/admin',
            '/admin/posts',
            '/admin/posts/create',
            "/admin/posts/{$post->id}/edit",
            '/admin/projects',
            '/admin/projects/create',
            "/admin/projects/{$project->id}/edit",
            '/admin/roles',
            '/admin/roles/create',
            "/admin/roles/{$role->id}/edit",
            '/admin/snippets',
            "/admin/snippets/{$snippet->id}/edit",
            '/admin/comments',
        ];

        foreach ($pages as $page) {
            $this->actingAs($user)->get($page)->assertOk();
        }
    }

    public function test_comments_cannot_be_created_from_the_admin(): void
    {
        $this->actingAs(User::factory()->create())
            ->get('/admin/comments/create')
            ->assertNotFound();
    }
}
