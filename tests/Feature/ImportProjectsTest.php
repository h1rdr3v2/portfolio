<?php

namespace Tests\Feature;

use App\Models\Project;
use Database\Seeders\ProjectSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImportProjectsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_adds_only_the_projects_the_database_is_missing(): void
    {
        $this->seed(ProjectSeeder::class);
        $total = Project::count();
        Project::query()->where('slug', 'drape')->delete();
        Project::query()->where('slug', 'ileke')->delete();
        $edited = Project::query()->where('slug', 'mycgpa')->firstOrFail();
        $edited->update(['name' => 'MyCGPA (edited)']);

        $this->artisan('projects:import', ['--force' => true])
            ->expectsOutputToContain('drape — Drape')
            ->expectsOutputToContain('Added 2 projects.')
            ->assertSuccessful();

        $this->assertSame($total, Project::count());
        $this->assertSame('MyCGPA (edited)', $edited->fresh()->name);
    }

    public function test_it_can_be_limited_to_named_slugs(): void
    {
        $this->artisan('projects:import', ['slug' => ['drape'], '--force' => true])
            ->expectsOutputToContain('Added 1 project.')
            ->assertSuccessful();

        $this->assertSame(['drape'], Project::query()->pluck('slug')->all());
    }

    public function test_it_asks_before_adding_and_adds_nothing_on_no(): void
    {
        $this->artisan('projects:import')
            ->expectsConfirmation('Add 29 projects?', 'no')
            ->expectsOutputToContain('Nothing added.')
            ->assertSuccessful();

        $this->assertSame(0, Project::count());
    }

    public function test_it_reports_when_there_is_nothing_to_add(): void
    {
        $this->seed(ProjectSeeder::class);

        $this->artisan('projects:import', ['--force' => true])
            ->expectsOutputToContain('Nothing to add')
            ->assertSuccessful();
    }
}
