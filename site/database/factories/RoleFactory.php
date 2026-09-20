<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'company' => fake()->company(),
            'title' => fake()->jobTitle(),
            'period' => '2021 — 2023',
            'status' => null,
            'description' => [fake()->sentence()],
            'is_current' => false,
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }

    public function current(): static
    {
        return $this->state(fn (): array => [
            'is_current' => true,
            'status' => 'Open for Collaboration',
            'description' => [fake()->sentence(), 'Want to work together? schedule a meeting.'],
        ]);
    }
}
