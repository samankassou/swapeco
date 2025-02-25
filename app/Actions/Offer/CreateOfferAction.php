<?php

declare(strict_types=1);

namespace App\Actions\Offer;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateOfferAction
{
    /**
     * Handle creating an offer.
     *
     * @param  array<string, string>  $attributes
     */
    public function handle(User $user, array $attributes): void
    {
        DB::transaction(function () use ($user, $attributes): void {
            $user->offers()->create($attributes);
        });
    }
}
