<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialLink>
 */
class SocialLinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'facebook' => $this->faker->url,
            'twitter' => $this->faker->url,
            'linkedin' => $this->faker->url,
            'github' => $this->faker->url,
            'instagram' => $this->faker->url,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
