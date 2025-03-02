<?php

declare(strict_types=1);

namespace App\Actions\Offer;

use App\Models\Offer;
use App\Models\User;

class UpdateOfferAction
{
    /**
     * Handle updating an offer.
     *
     * @param  array<string, string>  $attributes
     */
    public function handle(User $user, Offer $offer, array $attributes, array $campuses): void
    {
        $offer->update($attributes);
        $offer->campuses()->sync($campuses);
    }
}
