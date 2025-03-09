<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OfferSubCategory extends Model
{
    /** @use HasFactory<\Database\Factories\OfferSubCategoryFactory> */
    use HasFactory;

    /**
     * Get the parent category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(OfferCategory::class);
    }
}
