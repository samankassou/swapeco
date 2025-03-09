<?php

declare(strict_types=1);

use App\Models\SocialLink;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

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
test('social link belongs to a user', function () {
    $user = User::factory()->create();
    $socialLink = SocialLink::factory()->create(['user_id' => $user->id]);

    expect($socialLink->user)->toBeInstanceOf(User::class)
        ->and($socialLink->user->id)->toBe($user->id);
});

test('social link can be created with properties', function () {
    $data = [
        'user_id' => User::factory()->create()->id,
        'facebook' => 'https://facebook.com/test',
        'twitter' => 'https://twitter.com/test',
        'linkedin' => 'https://linkedin.com/in/test',
        'github' => 'https://github.com/test',
        'instagram' => 'https://instagram.com/test',
    ];

    $socialLink = SocialLink::create($data);

    expect($socialLink->facebook)->toBe($data['facebook'])
        ->and($socialLink->twitter)->toBe($data['twitter'])
        ->and($socialLink->linkedin)->toBe($data['linkedin'])
        ->and($socialLink->github)->toBe($data['github'])
        ->and($socialLink->instagram)->toBe($data['instagram']);
});

test('social link properties can be updated', function () {
    $socialLink = SocialLink::factory()->create([
        'facebook' => 'https://facebook.com/original',
    ]);

    $socialLink->update(['facebook' => 'https://facebook.com/updated']);

    expect($socialLink->fresh()->facebook)->toBe('https://facebook.com/updated');
});

test('social link has correct fillable attributes', function () {
    $fillable = [
        'user_id',
        'facebook',
        'twitter',
        'linkedin',
        'github',
        'instagram',
    ];

    $socialLink = new SocialLink();

    expect($socialLink->getFillable())->toBe($fillable);
});

test('social link factory creates valid instance', function () {
    $socialLink = SocialLink::factory()->create();

    expect($socialLink)->toBeInstanceOf(SocialLink::class)
        ->and($socialLink->exists)->toBeTrue();
});
