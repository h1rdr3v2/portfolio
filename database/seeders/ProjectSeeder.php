<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

/**
 * Fills an empty projects table from `data/projects.json`. Once anything is
 * in the table the admin owns it — a reseed must not add back a project
 * that was deleted or renamed there.
 */
class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        if (Project::query()->exists()) {
            return;
        }

        foreach (File::json(database_path('seeders/data/projects.json')) as $project) {
            Project::query()->create($project);
        }
    }
}
