<?php

declare(strict_types=1);

use App\Models\Offer;
use App\Models\Campus;
use App\Enums\Offers\OfferTypeEnum;

test('to array', function () {
    $offer = Offer::factory()->create()->fresh();

    expect(array_keys($offer->toArray()))
        ->toEqual([
            'id',
            'type',
            'title',
            'description',
            'estimated_value',
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


it('may belong to many campuses', function () {
    $offer = Offer::factory()->create();
    $campus = Campus::factory()->create();

    $offer->campuses()->attach($campus);

    expect($offer->campuses)->toHaveCount(1)
        ->and($offer->campuses->first()->id)->toEqual($campus->id);
});
