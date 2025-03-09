<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\MoneyCast;
use App\Enums\Offers\OfferStatusEnum;
use App\Enums\Offers\OfferTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property OfferTypeEnum $type
 * @property OfferStatusEnum $status
 * @property string $estimated_value
 * @property \Carbon\Carbon $published_at
 * @property-read \Carbon\Carbon $created_at
 * @property-read \Carbon\Carbon $updated_at
 * @property string $user_id
 */
class Offer extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\OfferFactory> */
    use HasFactory;

    use InteractsWithMedia;

    /**
     * Les campus associés à l'offre.
     */
    public function campuses(): BelongsToMany
    {
        return $this->belongsToMany(Campus::class);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaCollection('images')
            ->singleFile() // Si vous ne voulez qu'une seule image
            ->useFallbackUrl('/images/placeholders/placeholder.svg')
            ->useFallbackPath(public_path('/images/placeholders/placeholder.svg'));

        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 200, 200);

        $this
            ->addMediaConversion('medium')
            ->fit(Fit::Contain, 500, 500);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => OfferTypeEnum::class,
            'status' => OfferStatusEnum::class,
            'published_at' => 'datetime',
            'estimated_value' => MoneyCast::class,
        ];
    }
}
