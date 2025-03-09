<?php

declare(strict_types=1);

use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    // Création d'une route temporaire pour tester la requête
    Route::post('test-profile-update', function (ProfileUpdateRequest $request) {
        return response()->json(['success' => true]);
    })->middleware(['web', 'auth']);
});

test('valide les données de mise à jour du profil', function () {
    // Création d'un utilisateur
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('test-profile-update', [
            'name' => 'Nouveau Nom',
            'email' => 'nouveau@example.com',
        ])
        ->assertStatus(200)
        ->assertJson(['success' => true]);
});

test('échoue lorsque le nom est manquant', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('test-profile-update', [
            'email' => 'email@example.com',
        ])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['name']);
});

test('échoue lorsque l\'email est manquant', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('test-profile-update', [
            'name' => 'Nouveau Nom',
        ])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('échoue lorsque l\'email n\'est pas valide', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('test-profile-update', [
            'name' => 'Nouveau Nom',
            'email' => 'pas-un-email',
        ])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('échoue lorsque l\'email est déjà utilisé par un autre utilisateur', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();

    $this->actingAs($user1)
        ->postJson('test-profile-update', [
            'name' => 'Nouveau Nom',
            'email' => $user2->email,
        ])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('permet à l\'utilisateur de garder son propre email', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('test-profile-update', [
            'name' => 'Nouveau Nom',
            'email' => $user->email,
        ])
        ->assertStatus(200)
        ->assertJson(['success' => true]);
});
