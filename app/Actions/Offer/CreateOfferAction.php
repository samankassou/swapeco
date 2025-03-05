<?php

declare(strict_types=1);

namespace App\Actions\Offer;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateOfferAction
{
    /**
     * Handle creating an offer.
     *
     * @param  array<string, string>  $attributes
     */
    public function handle(User $user, array $attributes, array $campuses): void
    {
        $offer = DB::transaction(function () use ($user, $attributes, $campuses): Offer {
            $offer = $user->offers()->create($attributes);
            $offer->campuses()->attach($campuses);

            return $offer;
        });

        // Ajoutez cette partie pour gérer les médias
        if (request()->hasFile('images')) {
            foreach (request()->file('images') as $image) {
                $offer->addMedia($image)
                    ->toMediaCollection('images');
            }
        }
    }
}
