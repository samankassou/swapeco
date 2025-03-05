<?php

declare(strict_types=1);

use App\Models\SocialLink;

test('to array', function () {
    $socialLink = SocialLink::factory()->create()->fresh();

    expect(array_keys($socialLink->toArray()))
        ->toEqual([
            'id',
            'user_id',
            'facebook',
            'twitter',
            'linkedin',
            'github',
            'instagram',
            'created_at',
            'updated_at',
        ]);
});
