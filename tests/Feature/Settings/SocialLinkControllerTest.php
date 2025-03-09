<?php

declare(strict_types=1);

use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('can display social links page', function () {
    $this->actingAs($this->user)
        ->get(route('social_links.edit'))
        ->assertInertia(
            fn($assert) => $assert
                ->component('Settings/SocialMedia/Index')
                ->has('userSocialLinks')
        );
});

it('creates social link if user does not have one', function () {
    $this->assertNull($this->user->socialLink);

    $this->actingAs($this->user)
        ->get(route('social_links.edit'));

    $this->user->refresh();

    $this->assertNotNull($this->user->socialLink);
    $this->assertEquals('', $this->user->socialLink->facebook);
    $this->assertEquals('', $this->user->socialLink->twitter);
    $this->assertEquals('', $this->user->socialLink->linkedin);
    $this->assertEquals('', $this->user->socialLink->instagram);
    $this->assertEquals('', $this->user->socialLink->github);
});

it('can update social links', function () {
    // Arrange
    $this->actingAs($this->user)
        ->get(route('social_links.edit')); // This creates the initial social link

    $this->user->refresh();

    $updatedLinks = [
        'facebook' => 'https://facebook.com/testuser',
        'twitter' => 'https://twitter.com/testuser',
        'linkedin' => 'https://linkedin.com/in/testuser',
        'instagram' => 'https://instagram.com/testuser',
        'github' => 'https://github.com/testuser',
    ];

    // Act
    $response = $this->actingAs($this->user)
        ->put(route('social_links.update'), $updatedLinks);

    // Assert
    $response->assertRedirect();
    $response->assertSessionHas('success', 'Social media links updated successfully.');

    $this->user->refresh();
    $this->assertEquals($updatedLinks['facebook'], $this->user->socialLink->facebook);
    $this->assertEquals($updatedLinks['twitter'], $this->user->socialLink->twitter);
    $this->assertEquals($updatedLinks['linkedin'], $this->user->socialLink->linkedin);
    $this->assertEquals($updatedLinks['instagram'], $this->user->socialLink->instagram);
    $this->assertEquals($updatedLinks['github'], $this->user->socialLink->github);
});

it('validates social links', function () {
    // Arrange
    $this->actingAs($this->user)
        ->get(route('social_links.edit')); // This creates the initial social link

    // Act & Assert - Test with invalid URLs
    $this->actingAs($this->user)
        ->put(route('social_links.update'), [
            'facebook' => 'invalid-url',
            'twitter' => 'another-invalid-url',
            'linkedin' => 'https://linkedin.com/in/valid', // Valid URL
            'instagram' => '',
            'github' => '',
        ])
        ->assertSessionHasErrors(['facebook', 'twitter']);
});
