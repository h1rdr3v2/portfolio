<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * The one account that can log in to /admin. Credentials come from the
 * environment so a real password never lands in the repository; the defaults
 * are for local development only.
 */
class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@example.com')],
            [
                'name' => config('site.name'),
                'password' => env('ADMIN_PASSWORD', 'password'),
            ],
        );
    }
}
