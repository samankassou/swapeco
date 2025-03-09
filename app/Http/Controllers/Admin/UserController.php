<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

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

    public function create()
    {
        // Logic to show user creation form
    }

    public function store(Request $request)
    {
        // Logic to store a new user
    }

    public function show($id)
    {
        // Logic to show a specific user
    }

    public function edit($id)
    {
        // Logic to show user edit form
    }

    public function update(Request $request, $id)
    {
        // Logic to update a specific user
    }

    public function destroy($id)
    {
        // Logic to delete a specific user
    }
}
