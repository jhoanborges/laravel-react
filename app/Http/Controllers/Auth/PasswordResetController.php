<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\ApiAuthenticationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetController extends Controller
{
    public function __construct(
        private ApiAuthenticationService $apiAuth
    ) {}

    /**
     * Display the password reset request form.
     */
    public function create(): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle password reset request via external API.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'username' => ['required', 'string'],
        ]);

        Log::info('Password reset request', [
            'username' => $request->username,
            'ip' => $request->ip(),
        ]);

        // Request temporary password from API
        $success = $this->apiAuth->generateTemporaryPassword($request->username);

        if (! $success) {
            $apiError = $this->apiAuth->lastError ?? 'Unknown API error';
            $apiUrl = $this->apiAuth->lastApiUrl ?? 'Unknown URL';
            $statusCode = $this->apiAuth->lastStatusCode ?? 0;

            Log::warning('Password reset failed', [
                'username' => $request->username,
                'api_url' => $apiUrl,
                'api_error' => $apiError,
                'status_code' => $statusCode,
            ]);

            return back()->withErrors([
                'username' => 'Unable to generate temporary password. Please verify your username.',
                'api_debug' => json_encode([
                    'api_url' => $apiUrl,
                    'api_error' => $apiError,
                    'status_code' => $statusCode,
                ]),
            ])->onlyInput('username');
        }

        Log::info('Password reset successful', [
            'username' => $request->username,
        ]);

        return back()->with('status', 'A temporary password has been sent to your email.');
    }
}
