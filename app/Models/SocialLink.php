<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialLink extends Model
{
    /** @use HasFactory<\Database\Factories\SocialLinkFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'facebook',
        'twitter',
        'linkedin',
        'github',
        'instagram',
    ];

    /**
     * Get the user that owns the Social Link.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
