<?php

namespace App\Console\Commands;

use App\Models\Project;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

/**
 * Adds the projects in `data/projects.json` that the database does not have
 * yet. The seeder only fills an empty table, so this is how a project added
 * to the file reaches a site that is already seeded. Rows that exist are
 * left exactly as the admin has them, and nothing is ever removed — but a
 * project deleted in the admin is "missing" too, so the command says what it
 * is about to add and asks first.
 */
class ImportProjects extends Command
{
    protected $signature = 'projects:import
        {slug?* : Only these slugs; every missing one when omitted}
        {--force : Add without asking}';

    protected $description = 'Insert projects from the seed file whose slug is not in the database yet';

    public function handle(): int
    {
        $wanted = $this->argument('slug');
        $existing = Project::query()->pluck('slug')->all();

        $missing = collect(File::json(database_path('seeders/data/projects.json')))
            ->reject(fn (array $project): bool => in_array($project['slug'], $existing, true))
            ->filter(fn (array $project): bool => $wanted === [] || in_array($project['slug'], $wanted, true))
            ->values();

        if ($missing->isEmpty()) {
            $this->info('Nothing to add: every project in the file is in the database.');

            return self::SUCCESS;
        }

        foreach ($missing as $project) {
            $this->line("  {$project['slug']} — {$project['name']}");
        }

        if (! $this->option('force') && ! $this->confirm("Add {$missing->count()} ".str('project')->plural($missing->count()).'?', true)) {
            $this->comment('Nothing added.');

            return self::SUCCESS;
        }

        $missing->each(fn (array $project) => Project::query()->create($project));
        $this->info("Added {$missing->count()} ".str('project')->plural($missing->count()).'.');

        return self::SUCCESS;
    }
}
