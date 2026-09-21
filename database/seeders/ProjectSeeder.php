<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProjectSeeder extends Seeder
{
    /** Upserts by slug, so re-seeding refreshes copy without duplicating rows. */
    public function run(): void
    {
        $projects = File::json(database_path('seeders/data/projects.json'));

        foreach ($projects as $project) {
            Project::query()->updateOrCreate(['slug' => $project['slug']], $project);
        }
    }
}
