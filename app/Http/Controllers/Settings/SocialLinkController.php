<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSocialLinksRequest;
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
    public function edit(): Response
    {
        $user = Auth::user();
        $userSocialLinks = $user->socialLink->firstOrCreate();

        return Inertia::render('Settings/SocialMedia/Index', [
            'userSocialLinks' => $userSocialLinks,
        ]);
    }

    /**
     * Update the user's social media links.
     */
    public function update(UpdateSocialLinksRequest $request): RedirectResponse
    {
        Auth::user()->socialLink->update($request->validated());
        return back()->with('success', 'Social media links updated successfully.');
    }
}
