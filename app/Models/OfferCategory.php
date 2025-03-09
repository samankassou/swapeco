<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OfferCategory extends Model
{
    /** @use HasFactory<\Database\Factories\OfferCategoryFactory> */
    use HasFactory;

    /**
     * Get sub categories
     */
    public function subCategories(): HasMany
    {
        return $this->hasMany(OfferSubCategory::class, 'category_id');
    }
}
