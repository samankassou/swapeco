<?php

declare(strict_types=1);

use App\Models\Offer;
use App\Models\Campus;

test('to array', function () {
    $campus = Campus::factory()->create()->fresh();

    expect(array_keys($campus->toArray()))
        ->toEqual([
            'id',
            'country_id',
            'city_id',
            'name',
            'created_at',
            'updated_at',
        ]);
});

it('may have many offers', function () {
    $campus = Campus::factory()->create();
    $offer = Offer::factory()->create();

    $campus->offers()->attach($offer);

    expect($campus->offers)->toHaveCount(1)
        ->and($campus->offers->first()->id)->toEqual($offer->id);
});
