<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index()
    {
        $tasksJson = File::get(base_path('resources/js/Pages/Users/List/data/tasks.json'));
        $tasks = json_decode($tasksJson, true);
        $users = User::query()->get(['id', 'name', 'email'])->toArray();

        $labels = [
            [
                'value' => 'bug',
                'label' => 'Bug',
            ],
            [
                'value' => 'feature',
                'label' => 'Feature',
            ],
            [
                'value' => 'documentation',
                'label' => 'Documentation',
            ],
        ];

        return Inertia::render('Users/List/Index', [
            'tasks' => $tasks,
            'users' => $users,
            'labels' => $labels,
        ]);
    }

    public function create(): void
    {
        // Logic to show user creation form
    }

    public function store(Request $request): void
    {
        // Logic to store a new user
    }

    public function show($id): void
    {
        // Logic to show a specific user
    }

    public function edit($id): void
    {
        // Logic to show user edit form
    }

    public function update(Request $request, $id): void
    {
        // Logic to update a specific user
    }

    public function destroy(User $user): RedirectResponse
    {
        try {
            // Supprimer les offres liées de l'utilisateur
            $user->offers()->delete();
            // Supprimer le lien social s'il existe
            if ($user->socialLink) {
                $user->socialLink()->delete();
            }
            // Supprimer l'utilisateur
            $user->delete();
        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'danger',
                'message' => "Impossible de supprimer l'utilisateur en raison de données liées."
            ]);
        }

        return redirect()->back()->with('flash', [
            'type' => 'success',
            'message' => "L'utilisateur a été supprimé avec succès."
        ]);
    }
}
