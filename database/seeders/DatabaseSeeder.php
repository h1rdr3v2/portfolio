<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            ProjectSeeder::class,
            RoleSeeder::class,
            PostSeeder::class,
            SnippetSeeder::class,
        ]);
    }
}
