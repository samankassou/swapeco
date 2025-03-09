<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\UserController;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    // Créer un utilisateur pour les tests
    $this->user = User::factory()->create();

    // Assurez-vous que le fichier tasks.json existe pour le test
    $this->tasksPath = base_path('resources/js/Pages/Users/List/data/tasks.json');

    // Si le fichier n'existe pas, créez-le pour le test
    if (! File::exists($this->tasksPath)) {
        File::ensureDirectoryExists(dirname($this->tasksPath));
        File::put($this->tasksPath, json_encode([
            ['id' => 1, 'title' => 'Sample Task'],
        ]));
    }
});

test('index method returns Inertia view with correct props', function () {
    // Arrange
    $this->actingAs($this->user);

    // Act & Assert
    $response = $this->get(route('admin.users.index'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn (Assert $page) => $page
            ->component('Users/List/Index')
            ->has('tasks')
            ->has('users')
            ->has('labels', 3)
    );
});

// Test minimal pour la structure actuelle - ces tests échoueront tant que les méthodes
// ne seront pas correctement implémentées dans le contrôleur
test('other controller methods are defined', function () {
    $methods = ['create', 'store', 'show', 'edit', 'update', 'destroy'];

    foreach ($methods as $method) {
        expect(method_exists(UserController::class, $method))->toBeTrue();
    }
});
