<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Campus extends Model
{
    /** @use HasFactory<\Database\Factories\CampusFactory> */
    use HasFactory;

    public function offers(): BelongsToMany
    {
        return $this->belongsToMany(Offer::class);
    }
}
