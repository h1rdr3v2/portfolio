<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Project;
use App\Models\Role;
use App\Models\Snippet;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeedingTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeding_fills_an_empty_database(): void
    {
        $this->seed(DatabaseSeeder::class);

        $this->assertSame(19, Project::count());
        $this->assertSame(3, Project::query()->featured()->count());
        $this->assertSame(3, Post::count());
        $this->assertSame(6, Role::count());
        $this->assertNotNull(Snippet::html('now'));
    }

    public function test_reseeding_leaves_a_database_with_content_alone(): void
    {
        $this->seed(DatabaseSeeder::class);

        Post::query()->firstOrFail()->delete();
        $post = Post::query()->firstOrFail();
        $post->update(['slug' => 'renamed', 'title' => 'Edited in the admin', 'published_at' => null]);
        $project = Project::query()->where('slug', 'mycgpa')->firstOrFail();
        $project->update(['slug' => 'my-cgpa', 'name' => 'MyCGPA (edited)', 'is_featured' => false]);
        $role = Role::query()->firstOrFail();
        $role->update(['company' => 'Renamed Ltd']);

        $this->seed(DatabaseSeeder::class);

        $this->assertSame(2, Post::count());
        $this->assertSame(19, Project::count());
        $this->assertSame(6, Role::count());
        $this->assertSame('Edited in the admin', $post->fresh()->title);
        $this->assertNull($post->fresh()->published_at);
        $this->assertSame('MyCGPA (edited)', $project->fresh()->name);
        $this->assertFalse($project->fresh()->is_featured);
        $this->assertSame('Renamed Ltd', $role->fresh()->company);
        $this->assertSame(1, User::count());
    }
}
