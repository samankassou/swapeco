<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Campus;
use Spatie\Permission\Models\Role;
use App\Enums\Offers\OfferTypeEnum;
use App\Enums\Offers\OfferStatusEnum;
use Inertia\Testing\AssertableInertia as Assert;

it('can list offers', function () {
    $user = User::factory()->hasOffers(10, ['status' => OfferStatusEnum::PUBLISHED->value])->create();
    $role = Role::firstOrCreate(['name' => 'admin']);
    $user->assignRole($role);

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
    $role = Role::firstOrCreate(['name' => 'admin']);
    $user->assignRole($role);
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
        ->assertRedirect('/admin/exchange-market/my-offers');

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

it('can update an offer', function () {
    $user = User::factory()->hasOffers(1)->create();
    $role = Role::firstOrCreate(['name' => 'admin']);
    $user->assignRole($role);
    $offer = $user->offers()->first();
    $campus = Campus::factory()->create();

    $this->actingAs($user)
        ->put(route('admin.exchange_market.offers.update', $offer->id), [
            'type' => OfferTypeEnum::PRODUCT->value,
            'title' => 'Test',
            'description' => 'Test',
            'estimated_value' => 200,
            'status' => OfferStatusEnum::DRAFT->value,
            'campuses' => [$campus->id],
        ])
        ->assertStatus(302)
        ->assertRedirect('/admin/exchange-market/my-offers');

    $this->assertDatabaseHas('offers', [
        'id' => $offer->id,
        'type' => OfferTypeEnum::PRODUCT->value,
        'title' => 'Test',
        'description' => 'Test',
        'estimated_value' => 20000, // because of the conversion
        'status' => OfferStatusEnum::PENDING->value,
    ]);

    // assert that the offer is attached to the campus
    $this->assertDatabaseCount('campus_offer', 1);
    $this->assertDatabaseHas('campus_offer', [
        'offer_id' => $offer->id,
        'campus_id' => $campus->id,
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
