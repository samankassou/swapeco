<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\SocialLink;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SocialLinkFactory extends Factory
{
    protected $model = SocialLink::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'facebook' => $this->faker->url(),
            'twitter' => $this->faker->url(),
            'linkedin' => $this->faker->url(),
            'instagram' => $this->faker->url(),
            'github' => $this->faker->url(),
        ];
    }

    public function empty(): self
    {
        return $this->state(function () {
            return [
                'facebook' => '',
                'twitter' => '',
                'linkedin' => '',
                'instagram' => '',
                'github' => '',
            ];
        });
    }
}
