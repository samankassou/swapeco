<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\Offers\OfferStatusEnum;
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
            'type' => OfferTypeEnum::PRODUCT->value,
            'title' => fake()->sentence,
            'estimated_value' => fake()->randomNumber(4),
            'description' => fake()->text,
            'status' => OfferStatusEnum::DRAFT->value,
            'published_at' => now(),
            'user_id' => User::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
