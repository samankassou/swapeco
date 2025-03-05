<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SocialLinkController extends Controller
{
    /**
     * Show the user's social media settings page.
     */
    public function edit(Request $request): Response
    {
        $user = Auth::user();
        $socialLink = $user->socialLink;

        return Inertia::render('Settings/SocialMedia/Index', [
            'github' => $socialLink->github ?? '',
            'twitter' => $socialLink->twitter ?? '',
            'facebook' => $socialLink->facebook ?? '',
            'linkedin' => $socialLink->linkedin ?? '',
            'instagram' => $socialLink->instagram ?? '',
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

        $user = Auth::user();
        $socialLink = $user->socialLink ?? $this->createSocialLink($user);

        // Mise à jour des liens sociaux
        $socialLink->update($validated);

        return back()->with('success', 'Social media links updated successfully.');
    }

    /**
     * Crée un SocialLink pour l'utilisateur s'il n'existe pas.
     */
    private function createSocialLink($user): SocialLink
    {
        return $user->socialLink()->create();
    }
}
