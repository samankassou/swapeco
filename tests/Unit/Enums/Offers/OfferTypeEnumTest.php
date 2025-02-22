<?php

declare(strict_types=1);

use App\Enums\Offers\OfferTypeEnum;

it('has expected values', function () {
    $expected = ['service', 'product'];

    expect(OfferTypeEnum::values())->toBe($expected);
});

it('has expected labels', function () {
    $expected = ['Service', 'Produit'];

    expect(OfferTypeEnum::labels())->toBe($expected);
});

it('has expected options', function () {
    $expected = ['service' => 'Service', 'product' => 'Produit'];

    expect(OfferTypeEnum::options())->toBe($expected);
});
