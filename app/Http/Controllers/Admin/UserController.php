<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $tasksJson = File::get(base_path('resources/js/Pages/Users/List/data/tasks.json'));
        $tasks = json_decode($tasksJson, true);
        // Récupérer les utilisateurs avec leurs rôles
        $users = User::with('roles')->get(['id', 'name', 'email'])
            ->map(function ($user) {
                // Joindre les noms de rôles en une chaîne
                $user->role = $user->getRoleNames()->implode(', ');
                return $user;
            })->toArray();

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

        $roles = \Spatie\Permission\Models\Role::all(['name'])
            ->map(function ($role) {
                return ['value' => $role->name, 'label' => $role->name];
            })->toArray();

        return Inertia::render('Users/List/Index', [
            'tasks'  => $tasks,
            'users'  => $users,
            'labels' => $labels,
            'roles'  => $roles, // rôles disponibles pour le filtre
        ]);
    }

    public function create()
    {
        // Récupérer tous les rôles afin de les assigner lors de la création
        $roles = Role::all(['name']);
        return Inertia::render('Users/Create/Index', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role'     => 'required|string|exists:roles,name',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('admin.users.index')->with('flash', [
            'type'    => 'success',
            'message' => "L'utilisateur a été créé avec succès.",
        ]);
    }

    public function show($id): void
    {
        // Logic to show a specific user
    }

    public function edit($id): \Inertia\Response
    {
        $user = User::findOrFail($id);
        $roles = Role::all(['name'])
            ->map(function ($role) {
                return ['value' => $role->name, 'label' => $role->name];
            })->toArray();

        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->first()?->name ?? '',
            ],
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'role'  => 'required|string|exists:roles,name',
        ]);

        $user->update([
            'name'  => $validated['name'],
        ]);

        $user->syncRoles($validated['role']);

        return redirect()->route('admin.users.index')->with('flash', [
            'type'    => 'success',
            'message' => "L'utilisateur a été mis à jour avec succès.",
        ]);
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
