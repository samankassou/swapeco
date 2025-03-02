<?php

declare(strict_types=1);


use App\Models\User;
use App\Actions\Offer\DeleteOfferAction;


it('can delete an offer', function () {

    $action = app(DeleteOfferAction::class);
    $user = User::factory()->hasOffers(1)->create();
    $offer = $user->offers()->first();

    $action->handle($user, $offer);

    $this->assertDatabaseMissing('offers', [
        'id' => $offer->id,
    ]);
});

it('can delete an offer with attached campuses', function () {

    $action = app(DeleteOfferAction::class);
    $user = User::factory()->hasOffers(1)->create();
    $offer = $user->offers()->first();
    $offer->campuses()->attach([1, 2]);

    $action->handle($user, $offer);

    $this->assertDatabaseMissing('offers', [
        'id' => $offer->id,
    ]);

    // assert that the offer is detached from the campuses
    $this->assertDatabaseCount('campus_offer', 0);
});
