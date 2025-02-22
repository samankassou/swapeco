<?php

declare(strict_types=1);

use App\Models\OfferCategory;
use App\Models\OfferSubCategory;

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

it('may have sub categories', function () {
    $offerCategory = OfferCategory::factory()->hasSubCategories(3)->create();

    expect($offerCategory->subCategories)->toHaveCount(3)
        ->each->toBeInstanceOf(OfferSubCategory::class);
});
