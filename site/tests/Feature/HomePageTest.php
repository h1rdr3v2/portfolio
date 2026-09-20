<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Project;
use App\Models\Role;
use App\Models\Snippet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_renders_with_everything_the_page_needs(): void
    {
        Project::factory()->featured(2)->create(['slug' => 'second']);
        Project::factory()->featured(1)->create(['slug' => 'first']);
        Project::factory()->count(4)->create();
        Post::factory()->count(5)->create();
        Post::factory()->draft()->create();
        Role::factory()->current()->create();
        Role::factory()->count(2)->create();
        Snippet::factory()->create(['key' => 'now', 'body' => 'Building **things**.']);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('home')
                ->has('featured', 2)
                ->where('featured.0.slug', 'first')
                ->has('featured.0.images', 2)
                ->has('projects', 4)
                ->has('posts', 3)
                ->where('postCount', 5)
                ->has('currentRoles', 1)
                ->has('formerRoles', 2)
                ->where('now', "<p>Building <strong>things</strong>.</p>\n")
                ->has('site.socials'),
            );
    }

    public function test_the_social_preview_tags_are_in_the_html(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('property="og:title"', false)
            ->assertSee('property="og:image"', false)
            ->assertSee(config('site.name'));
    }

    public function test_it_copes_with_an_empty_database(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('home')
                ->has('featured', 0)
                ->has('posts', 0)
                ->where('now', null),
            );
    }
}
