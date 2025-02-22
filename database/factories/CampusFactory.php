<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Campus>
 */
class CampusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $country = Country::factory()->hasCities(3)->create();
        $city = $country->cities->first;

        return [
            'name' => $this->faker->company,
            'country_id' => $country->id,
            'city_id' => $city->id,
        ];
    }
}
