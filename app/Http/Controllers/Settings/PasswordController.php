<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Services\ApiAuthenticationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    public function __construct(private ApiAuthenticationService $apiAuthService) {}

    /**
     * Show the user's password settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/password');
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user = $request->user();

        // Use dummy token for now - will be replaced with actual session token later
        $token = $user->api_token ?? 'dummy_token_placeholder';

        // Extract username from email (assuming format: username@domain)
        $usuario = explode('@', $user->email)[0];

        // Call external API to update password
        $success = $this->apiAuthService->updatePassword(
            $usuario,
            $validated['password'],
            $token
        );

        if (! $success) {
            return back()->withErrors([
                'password' => $this->apiAuthService->lastError ?? 'Failed to update password. Please try again.',
            ]);
        }

        // Update local password hash
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
