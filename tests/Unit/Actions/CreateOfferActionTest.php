<?php

declare(strict_types=1);

use App\Models\User;
use App\Enums\Offers\OfferTypeEnum;
use App\Enums\Offers\OfferStatusEnum;
use App\Actions\Offer\CreateOfferAction;

it('can create an offer', function () {

    $action = app(CreateOfferAction::class);
    $user = User::factory()->create();

    $action->handle($user, [
        'type' => OfferTypeEnum::PRODUCT,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 200,
        'status' => OfferStatusEnum::DRAFT,
    ]);

    $this->assertDatabaseHas('offers', [
        'type' => OfferTypeEnum::PRODUCT,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 200,
        'status' => OfferStatusEnum::DRAFT,
        'user_id' => $user->id,
    ]);
});
