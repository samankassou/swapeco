<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('can list offers', function () {
    $user = User::factory()->hasOffers(10)->create();

    $this->actingAs($user)
        ->get('/admin/exchange-market/offers')
        ->assertInertia(
            fn (Assert $assert) => $assert
                ->component('ExchangeMarket/Offers/List/Index')
                ->has('offers', 10)
        );
});
