<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = File::json(database_path('seeders/data/roles.json'));

        foreach ($roles as $role) {
            Role::query()->updateOrCreate(
                ['company' => $role['company'], 'period' => $role['period']],
                $role,
            );
        }
    }
}
