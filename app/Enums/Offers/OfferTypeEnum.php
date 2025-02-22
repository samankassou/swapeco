<?php

declare(strict_types=1);

namespace App\Enums\Offers;

enum OfferTypeEnum: string
{
    case SERVICE = 'service';
    case PRODUCT = 'product';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function labels(): array
    {
        return array_map(fn ($case): string => $case->label(), self::cases());
    }

    public static function options(): array
    {
        return array_combine(self::values(), self::labels());
    }

    public function label(): string
    {
        return match ($this) {
            self::SERVICE => 'Service',
            self::PRODUCT => 'Produit',
        };
    }
}
