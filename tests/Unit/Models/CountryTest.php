<?php

declare(strict_types=1);

use App\Models\City;
use App\Models\Country;

test('to array', function () {
    $country = Country::factory()->create()->fresh();

    expect(array_keys($country->toArray()))
        ->toEqual([
            'id',
            'name',
            'created_at',
            'updated_at',
        ]);
});


it('may have cities', function () {
    $country = Country::factory()->hasCities(3)->create();

    expect($country->cities)->toHaveCount(3)
        ->each->toBeInstanceOf(City::class);
});
