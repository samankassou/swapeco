<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\OfferCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OfferSubCategory>
 */
class OfferSubCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => OfferCategory::factory(),
            'name' => $this->faker->word,
        ];
    }
}
