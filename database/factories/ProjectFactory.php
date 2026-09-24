<?php

namespace Database\Factories;

use App\Enums\ProjectCategory;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);

        return [
            'name' => Str::title($name),
            'slug' => Str::slug($name),
            'category' => fake()->randomElement(ProjectCategory::cases()),
            'description' => fake()->sentence(),
            'story' => fake()->paragraph(),
            'tools' => fake()->randomElements(['React Native', 'Expo', 'Laravel', 'NestJS', 'TypeScript'], 2),
            'links' => ['github' => fake()->url()],
            'images' => [],
            'year' => (string) fake()->year(),
            'is_featured' => false,
            'featured_order' => null,
            'sort_order' => fake()->numberBetween(1, 50),
        ];
    }

    public function featured(int $order = 1): static
    {
        return $this->state(fn (): array => [
            'is_featured' => true,
            'featured_order' => $order,
            'images' => ['/images/projects/mysales/image-1.png', '/images/projects/mysales/image-2.png'],
        ]);
    }

    public function withCaseStudy(): static
    {
        return $this->state(fn (): array => [
            'problem' => fake()->sentence(),
            'outcome' => fake()->sentence(),
            'metrics' => [
                ['value' => '4.8★', 'label' => 'Play Store rating'],
                ['value' => '3 yrs', 'label' => 'live in production'],
            ],
        ]);
    }
}
