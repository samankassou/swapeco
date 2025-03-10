<?php

declare(strict_types=1);

namespace App\Actions\Offer;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DeleteOfferAction
{
    /**
     * Handle deleting an offer.
     */
    public function handle(User $user, Offer $offer): void
    {
        DB::transaction(function () use ($user, $offer): void {
            $offer->campuses()->detach();
            $offer->delete();
        });
    }
}
