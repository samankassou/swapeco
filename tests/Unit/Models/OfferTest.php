<?php

declare(strict_types=1);

use App\Enums\Offers\OfferTypeEnum;
use App\Models\Offer;

test('to array', function () {
    $offer = Offer::factory()->create()->fresh();

    expect(array_keys($offer->toArray()))
        ->toEqual([
            'id',
            'type',
            'title',
            'description',
            'price',
            'status',
            'user_id',
            'published_at',
            'created_at',
            'updated_at',
        ]);
});

test('the type attribute is an instance of OfferTypeEnum', function () {
    $offer = Offer::factory()->create()->fresh();

    expect($offer->type)->toBeInstanceOf(OfferTypeEnum::class);
});
