<?php

declare(strict_types=1);

use App\Models\OfferCategory;

test('to array', function () {
    $offerCategory = OfferCategory::factory()->create()->fresh();

    expect(array_keys($offerCategory->toArray()))
        ->toEqual([
            'id',
            'name',
            'created_at',
            'updated_at',
        ]);
});
