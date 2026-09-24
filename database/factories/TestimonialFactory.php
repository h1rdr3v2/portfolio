<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    public function definition(): array
    {
        return [
            'quote' => fake()->sentences(2, true),
            'author' => fake()->name(),
            'author_title' => fake()->jobTitle().', '.fake()->company(),
            'url' => null,
            'is_published' => true,
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }

    public function unpublished(): static
    {
        return $this->state(fn (): array => [
            'is_published' => false,
        ]);
    }
}
