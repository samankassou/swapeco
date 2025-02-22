<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\Offers\OfferTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    /** @use HasFactory<\Database\Factories\OfferFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => OfferTypeEnum::class,
            'published_at' => 'datetime',
        ];
    }
}
