<?php

declare(strict_types=1);

use App\Actions\Offer\CreateOfferAction;
use App\Enums\Offers\OfferStatusEnum;
use App\Enums\Offers\OfferTypeEnum;
use App\Models\Campus;
use App\Models\User;

it('can create an offer', function () {

    $action = app(CreateOfferAction::class);
    $user = User::factory()->create();
    // array of campus ids
    $campuses = Campus::factory(2)->create();
    $campusIds = $campuses->pluck('id')->toArray();

    $action->handle($user, [
        'type' => OfferTypeEnum::PRODUCT->value,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 200,
        'status' => OfferStatusEnum::DRAFT,
    ], $campusIds);

    $this->assertDatabaseHas('offers', [
        'type' => OfferTypeEnum::PRODUCT->value,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 20000, // because of the conversion
        'status' => OfferStatusEnum::DRAFT->value,
        'user_id' => $user->id,
    ]);

    // assert that the offer is attached to the campuses
    $this->assertDatabaseCount('campus_offer', 2);
    $this->assertDatabaseHas('campus_offer', [
        'offer_id' => 1,
        'campus_id' => $campusIds[0],
    ]);
    $this->assertDatabaseHas('campus_offer', [
        'offer_id' => 1,
        'campus_id' => $campusIds[1],
    ]);
});
