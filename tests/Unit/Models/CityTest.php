<?php

declare(strict_types=1);

use App\Models\City;
use App\Models\Country;

test('to array', function () {
    $city = City::factory()->create()->fresh();

    expect(array_keys($city->toArray()))
        ->toEqual([
            'id',
            'country_id',
            'name',
            'created_at',
            'updated_at',
        ]);
});

it('belongs to a country', function () {
    $city = City::factory()->create()->fresh();

    expect($city->country)->toBeInstanceOf(Country::class);
});
