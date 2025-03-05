<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'images' => $this->getMedia('images')->map(fn ($media) => [
                'id' => $media->id,
                'name' => $media->file_name,
                'url' => $media->getUrl(),
            ]),
            'campuses' => $this->whenLoaded('campuses'),
            'published_at' => $this->published_at?->diffForHumans(),
            'user' => $this->whenLoaded('user'),
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
