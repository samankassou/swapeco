<?php

declare(strict_types=1);

use App\Models\OfferCategory;
use App\Models\OfferSubCategory;

test('to array', function () {
    $offerSubCategory = OfferSubCategory::factory()->create()->fresh();

    expect(array_keys($offerSubCategory->toArray()))
        ->toEqual([
            'id',
            'category_id',
            'name',
            'created_at',
            'updated_at',
        ]);
});

it('belongs to category', function () {
    $offerSubCategory = OfferSubCategory::factory()->create();

    expect($offerSubCategory->category)->toBeInstanceOf(OfferCategory::class);
});
