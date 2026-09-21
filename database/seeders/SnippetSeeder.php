<?php

namespace Database\Seeders;

use App\Models\Snippet;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SnippetSeeder extends Seeder
{
    /** Seeds the block once; after that the admin owns it and re-seeding leaves it alone. */
    public function run(): void
    {
        $body = File::get(database_path('seeders/data/now.md'));

        Snippet::query()->firstOrCreate(['key' => 'now'], [
            'title' => "What I'm working on",
            'body' => $body,
        ]);
    }
}
