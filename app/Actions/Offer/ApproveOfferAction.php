<?php

declare(strict_types=1);

namespace App\Actions\Offer;

use App\Enums\Offers\OfferStatusEnum;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ApproveOfferAction
{
    /**
     * Handle closing an offer.
     */
    public function handle(User $user, Offer $offer): void
    {
        DB::transaction(function () use ($user, $offer): void {
            $user->offers()->findOrFail($offer->id)->update([
                'status' => OfferStatusEnum::PUBLISHED->value,
            ]);
        });
    }
}
