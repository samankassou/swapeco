<?php

declare(strict_types=1);

use App\Http\Resources\CampusResource;
use App\Models\Campus;

test('campus resource transforms data correctly', function () {
    // Arrange: Créer un modèle Campus avec des valeurs connues
    $campus = Campus::factory()->make([
        'id' => 1,
        'name' => 'Campus Test',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    // Act: Transformer le modèle en ressource
    $resource = (new CampusResource($campus))->toArray(request());

    // Assert: Vérifier que la transformation est correcte
    expect($resource)
        ->toBeArray()
        ->toHaveKeys(['id', 'name'])
        ->and($resource['id'])->toBe(1)
        ->and($resource['name'])->toBe('Campus Test')
        // Vérifier que les champs created_at et updated_at ne sont pas inclus
        ->and($resource)->not->toHaveKey('created_at')
        ->and($resource)->not->toHaveKey('updated_at');
});

test('campus resource handles null values correctly', function () {
    // Act: Transformer une ressource null
    $resource = (new CampusResource(null))->toArray(request());

    // Assert: Vérifier que la ressource est vide
    expect($resource)->toBeEmpty();
});

test('campus collection transforms correctly', function () {
    // Arrange: Créer plusieurs modèles Campus
    $campuses = Campus::factory()->count(3)->make();

    // Act: Transformer les modèles en collection de ressources
    $collection = CampusResource::collection($campuses)->toArray(request());

    // Assert: Vérifier que la collection est correcte
    expect($collection['data'])
        ->toBeArray()
        ->toHaveCount(3)
        ->each->toHaveKeys(['id', 'name']);
});
