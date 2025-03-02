<?php

declare(strict_types=1);

use App\Actions\Offer\UpdateOfferAction;
use App\Enums\Offers\OfferStatusEnum;
use App\Enums\Offers\OfferTypeEnum;
use App\Models\Campus;
use App\Models\User;

it('can update an offer', function () {

    $action = app(UpdateOfferAction::class);
    $user = User::factory()->create();
    $campus = Campus::factory()->create();
    $offer = $user->offers()->create([
        'type' => OfferTypeEnum::PRODUCT->value,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 200,
        'status' => OfferStatusEnum::DRAFT,
    ]);
    $offer->campuses()->attach($campus);

    $action->handle($user, $offer, [
        'type' => OfferTypeEnum::SERVICE->value,
        'title' => 'Test 2',
        'description' => 'Test 2',
        'estimated_value' => 300,
        'status' => OfferStatusEnum::DRAFT,
    ], [$campus->id]);

    $this->assertDatabaseHas('offers', [
        'id' => $offer->id,
        'type' => OfferTypeEnum::SERVICE->value,
        'title' => 'Test 2',
        'description' => 'Test 2',
        'estimated_value' => 30000, // because of conversion
        'status' => OfferStatusEnum::DRAFT->value,
        'user_id' => $user->id,
    ]);
});
