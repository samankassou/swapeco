<?php

declare(strict_types=1);

namespace App\Enums\Offers;

enum OfferStatusEnum: string
{
    case DRAFT = 'draft';
    case PENDING = 'pending';
    case PUBLISHED = 'published';
    case CLOSED = 'closed';

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
            self::DRAFT => 'Brouillon',
            self::PENDING => 'En attente',
            self::PUBLISHED => 'Publié',
            self::CLOSED => 'Fermé',
        };
    }

    public function classes(): string
    {
        return match ($this) {
            self::DRAFT => 'bg-gray-200 text-gray-700',
            self::PENDING => 'bg-yellow-200 text-yellow-700',
            self::PUBLISHED => 'bg-green-200 text-green-700',
            self::CLOSED => 'bg-red-200 text-red-700',
        };
    }
}
