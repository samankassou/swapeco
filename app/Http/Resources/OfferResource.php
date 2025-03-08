<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Offer
 *
 * @property-read int $id
 * @property-read string $title
 * @property-read string $description
 * @property-read \App\Enums\Offers\OfferTypeEnum $type
 * @property-read \App\Enums\Offers\OfferStatusEnum $status
 * @property-read float|null $estimated_value
 * @property-read \Carbon\Carbon|null $published_at
 * @property-read \Carbon\Carbon $created_at
 * @property-read \Carbon\Carbon $updated_at
 *
 * @method string getFirstMediaUrl(string $collection = 'default', string $conversion = '')
 * @method \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection getMedia(string $collection = 'default')
 */
class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'type' => [
                'value' => $this->type->value,
                'label' => $this->type->label(),
                'classes' => $this->type->classes(),
            ],
            'status' => [
                'value' => $this->status->value,
                'label' => $this->status->label(),
                'classes' => $this->status->classes(),
            ],
            'estimated_value' => $this->estimated_value,
            'image_url' => $this->getFirstMediaUrl('images'),
            // get media id, name, url
            'images' => $this->getMedia('images')->map(fn ($media): array => [
                'id' => $media->id,
                'name' => $media->file_name,
                'url' => $media->getUrl(),
            ]),
            'campuses' => $this->whenLoaded('campuses'),
            'published_at' => $this->published_at?->diffForHumans(),
            'owner' => $this->whenLoaded('owner'),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
