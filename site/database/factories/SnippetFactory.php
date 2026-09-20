<?php

namespace Database\Factories;

use App\Models\Snippet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Snippet>
 */
class SnippetFactory extends Factory
{
    public function definition(): array
    {
        return [
            'key' => fake()->unique()->slug(1),
            'title' => fake()->words(3, true),
            'body' => fake()->paragraph(),
        ];
    }
}
