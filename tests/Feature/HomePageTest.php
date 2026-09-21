<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Project;
use App\Models\Role;
use App\Models\Snippet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_renders_with_everything_the_page_needs(): void
    {
        Project::factory()->featured(2)->create(['slug' => 'second', 'name' => 'Second App']);
        Project::factory()->featured(1)->create(['slug' => 'first', 'name' => 'First App']);
        Project::factory()->count(4)->create();
        Post::factory()->count(5)->create();
        Post::factory()->draft()->create(['title' => 'Still a draft']);
        Role::factory()->current()->create(['company' => 'Bleon CO LTD']);
        Role::factory()->count(2)->create();
        Snippet::factory()->create(['key' => 'now', 'body' => 'Building **things**.']);

        $this->get('/')
            ->assertOk()
            ->assertViewIs('home')
            ->assertViewHas('featured', fn ($featured) => $featured->pluck('slug')->all() === ['first', 'second'])
            ->assertViewHas('projects', fn ($projects) => $projects->count() === 4)
            ->assertViewHas('posts', fn ($posts) => $posts->count() === 3)
            ->assertViewHas('postCount', 5)
            ->assertViewHas('currentRoles', fn ($roles) => $roles->count() === 1)
            ->assertViewHas('formerRoles', fn ($roles) => $roles->count() === 2)
            ->assertSeeInOrder(['First App', 'Second App'])
            ->assertSee('Building <strong>things</strong>.', false)
            ->assertSee('Bleon CO LTD')
            ->assertDontSee('Still a draft');
    }

    public function test_the_social_preview_tags_are_in_the_html(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('property="og:title"', false)
            ->assertSee('property="og:image"', false)
            ->assertSee('application/ld+json', false)
            ->assertSee(config('site.name'));
    }

    public function test_it_copes_with_an_empty_database(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertViewHas('featured', fn ($featured) => $featured->isEmpty())
            ->assertViewHas('now', null)
            ->assertDontSee('Featured')
            ->assertSee("Let's Keep in Touch", false);
    }
}
