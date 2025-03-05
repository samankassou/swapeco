<?php

declare(strict_types=1);

namespace App\Actions\Offer;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UpdateOfferAction
{
    /**
     * Handle updating an offer.
     *
     * @param  array<string, string>  $attributes
     */
    public function handle(User $user, Offer $offer, array $attributes, array $campuses): void
    {
        $offer = DB::transaction(function () use ($offer, $attributes, $campuses): Offer {
            $offer->update($attributes);
            $offer->campuses()->sync($campuses);

            return $offer;
        });

        // Gérer les images supprimées
        if (request()->has('delete_images')) {
            $offer->media()
                ->whereIn('id', request()->input('delete_images'))
                ->delete();
        }

        // Gérer les nouvelles images
        if (request()->hasFile('images')) {
            // Ajouter les nouveaux médias
            foreach (request()->file('images') as $file) {
                $offer->addMedia($file)
                    ->toMediaCollection('images');
            }
        }
    }
}
