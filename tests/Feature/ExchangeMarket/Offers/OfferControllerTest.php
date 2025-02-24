<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('can list offers', function () {
    $user = User::factory()->hasOffers(10)->create();

    $this->actingAs($user)
        ->get('/admin/exchange-market/offers')
        ->assertInertia(
            fn(Assert $assert) => $assert
                ->component('ExchangeMarket/Offers/List/Index')
                ->has('offers.data', 10)
        );
});

/*it('can create an offer', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('exchange_market.offers.store'), [
            'type_of_expense_id' => $typeOfExpense->id,
            'title' => 'Fuel',
            'date' => '2021-01-01',
            'amount' => 500,
        ]);

    $response->assertStatus(302)
        ->assertRedirect('/admin/exchange-market/offers');

    $this->assertDatabaseHas('offers', [
        'company_id' => $company->id,
        'type_of_expense_id' => $typeOfExpense->id,
        'title' => 'Fuel',
        'date' => '2021-01-01',
        'amount' => 500,
    ]);
});*/
