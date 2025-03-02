<?php

declare(strict_types=1);


use App\Models\User;
use App\Actions\Offer\CloseOfferAction;
use App\Enums\Offers\OfferStatusEnum;

it('can close an offer', function () {

    $action = app(CloseOfferAction::class);
    $user = User::factory()->hasOffers(1)->create();
    $offer = $user->offers()->first();

    $action->handle($user, $offer);

    $this->assertDatabaseHas('offers', [
        'id' => $offer->id,
        'status' => OfferStatusEnum::CLOSED->value,
    ]);
});
