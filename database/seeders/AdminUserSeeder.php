<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * The one account that can log in to /admin, created only when there are no
 * users yet. Credentials come from the environment so a real password never
 * lands in the repository; the defaults are for local development only.
 */
class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        if (User::query()->exists()) {
            return;
        }

        User::query()->create([
            'name' => config('site.name'),
            'email' => env('ADMIN_EMAIL', 'admin@example.com'),
            'password' => env('ADMIN_PASSWORD', 'password'),
        ]);
    }
}
