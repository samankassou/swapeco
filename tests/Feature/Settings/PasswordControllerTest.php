<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('password edit page can be rendered', function () {
    $response = $this->actingAs($this->user)
        ->get(route('password.edit'));

    $response->assertInertia(
        fn ($assert) => $assert
            ->component('Settings/Password/Index')
            ->has('mustVerifyEmail')
            ->has('status')
    );
});

test('password can be updated', function () {
    $response = $this->actingAs($this->user)
        ->put(route('password.update'), [
            'current_password' => 'password', // Le mot de passe par défaut de factory
            'password' => 'newPassword123',
            'password_confirmation' => 'newPassword123',
        ]);

    $response->assertRedirect();

    // Vérifie si le mot de passe a été mis à jour
    $this->user->refresh();
    expect(Hash::check('newPassword123', $this->user->password))->toBeTrue();
});

test('password is not updated with incorrect current password', function () {
    $originalPassword = $this->user->password;

    $response = $this->actingAs($this->user)
        ->put(route('password.update'), [
            'current_password' => 'incorrect-password',
            'password' => 'newPassword123',
            'password_confirmation' => 'newPassword123',
        ]);

    $response->assertSessionHasErrors('current_password');

    // Vérifie que le mot de passe n'a pas changé
    $this->user->refresh();
    expect($this->user->password)->toBe($originalPassword);
});

test('password requires confirmation', function () {
    $response = $this->actingAs($this->user)
        ->put(route('password.update'), [
            'current_password' => 'password',
            'password' => 'newPassword123',
            'password_confirmation' => 'different-password',
        ]);

    $response->assertSessionHasErrors('password');
});

test('password must meet strength requirements', function () {
    $response = $this->actingAs($this->user)
        ->put(route('password.update'), [
            'current_password' => 'password',
            'password' => 'weak',
            'password_confirmation' => 'weak',
        ]);

    $response->assertSessionHasErrors('password');
});
