<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

/** Fills an empty roles table; after that the admin owns it. */
class RoleSeeder extends Seeder
{
    public function run(): void
    {
        if (Role::query()->exists()) {
            return;
        }

        foreach (File::json(database_path('seeders/data/roles.json')) as $role) {
            Role::query()->create($role);
        }
    }
}
