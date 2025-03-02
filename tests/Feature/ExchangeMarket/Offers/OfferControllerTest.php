<?php

declare(strict_types=1);

use App\Enums\Offers\OfferStatusEnum;
use App\Enums\Offers\OfferTypeEnum;
use App\Models\Campus;
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

it('can create an offer', function () {
    $user = User::factory()->create();
    // array of campus ids
    $campuses = Campus::factory(2)->create();
    $campusIds = $campuses->pluck('id')->toArray();

    $response = $this->actingAs($user)
        ->post(route('admin.exchange_market.offers.store'), [
            'type' => OfferTypeEnum::PRODUCT->value,
            'title' => 'Test',
            'description' => 'Test',
            'estimated_value' => 200,
            'status' => OfferStatusEnum::DRAFT->value,
            'campuses' => $campusIds,
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

it('can delete an offer', function () {
    $user = User::factory()->hasOffers(1)->create();
    $offet = $user->offers()->first();

    $this->actingAs($user)
        ->delete(route('admin.exchange_market.offers.destroy', $offet->id))
        ->assertStatus(302)
        ->assertRedirect('/admin/exchange-market/offers');

    $this->assertDatabaseMissing('offers', [
        'id' => $offet->id,
    ]);
});

it('can delete offers with campuses', function () {
    $user = User::factory()->hasOffers(1)->create();
    $offet = $user->offers()->first();
    $campus = Campus::factory()->create();
    $offet->campuses()->attach($campus);

    $this->actingAs($user)
        ->delete(route('admin.exchange_market.offers.destroy', $offet->id))
        ->assertStatus(302)
        ->assertRedirect('/admin/exchange-market/offers');

    $this->assertDatabaseMissing('offers', [
        'id' => $offet->id,
    ]);

    // assert that the campus is detached from the offer
    $this->assertDatabaseMissing('campus_offer', [
        'offer_id' => $offet->id,
        'campus_id' => $campus->id,
    ]);
});
