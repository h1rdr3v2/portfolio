<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Reaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reaction>
 */
class ReactionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'post_id' => Post::factory(),
            'emoji' => fake()->randomElement(Reaction::EMOJIS),
            'fingerprint' => fake()->sha256(),
        ];
    }
}
