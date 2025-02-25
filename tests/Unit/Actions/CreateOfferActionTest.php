<?php

declare(strict_types=1);

use App\Actions\Offer\CreateOfferAction;
use App\Enums\Offers\OfferStatusEnum;
use App\Enums\Offers\OfferTypeEnum;
use App\Models\User;

it('can create an offer', function () {

    $action = app(CreateOfferAction::class);
    $user = User::factory()->create();

    $action->handle($user, [
        'type' => OfferTypeEnum::PRODUCT->value,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 200,
        'status' => OfferStatusEnum::DRAFT,
    ]);

    $this->assertDatabaseHas('offers', [
        'type' => OfferTypeEnum::PRODUCT->value,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 200,
        'status' => OfferStatusEnum::DRAFT->value,
        'user_id' => $user->id,
    ]);
});
