<?php

declare(strict_types=1);

use App\Enums\Offers\OfferStatusEnum;
use App\Enums\Offers\OfferTypeEnum;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('can list offers', function () {
    $user = User::factory()->hasOffers(10)->create();

    $this->actingAs($user)
        ->get('/admin/exchange-market/offers')
        ->assertInertia(
            fn (Assert $assert) => $assert
                ->component('ExchangeMarket/Offers/List/Index')
                ->has('offers.data', 10)
        );
});

it('can create an offer', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.exchange_market.offers.store'), [
            'type' => OfferTypeEnum::PRODUCT->value,
            'title' => 'Test',
            'description' => 'Test',
            'estimated_value' => 200,
            'status' => OfferStatusEnum::DRAFT->value,
        ]);

    $response->assertStatus(302)
        ->assertRedirect('/admin/exchange-market/offers');

    $this->assertDatabaseHas('offers', [
        'type' => OfferTypeEnum::PRODUCT->value,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 200,
        'status' => OfferStatusEnum::DRAFT->value,
        'user_id' => $user->id,
    ]);
});
