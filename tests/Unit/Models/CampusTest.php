<?php

declare(strict_types=1);

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
