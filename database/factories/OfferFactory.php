<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\Offers\OfferTypeEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(OfferTypeEnum::values()),
            'title' => fake()->word,
            'price' => fake()->randomNumber(4),
            'description' => fake()->text,
            'status' => 'active',
            'published_at' => now(),
            'user_id' => User::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
