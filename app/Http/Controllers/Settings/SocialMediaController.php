<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialMediaController extends Controller
{
    /**
     * Show the user's social media settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Settings/SocialMedia/Index', [
            'github' => $request->user()->github,
            'twitter' => $request->user()->twitter,
            'facebook' => $request->user()->facebook,
            'linkedin' => $request->user()->linkedin,
            'instagram' => $request->user()->instagram,
        ]);
    }

    /**
     * Update the user's social media links.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'github' => ['nullable', 'url'],
            'twitter' => ['nullable', 'url'],
            'facebook' => ['nullable', 'url'],
            'linkedin' => ['nullable', 'url'],
            'instagram' => ['nullable', 'url'],
        ]);

        $request->user()->update($validated);

        return back();
    }
}
