<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\ApiAuthenticationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    public function __construct(
        private ApiAuthenticationService $apiAuth
    ) {}

    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => false,
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request via external API.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required'],
        ]);

        Log::info('Login attempt', [
            'username' => $request->username,
            'ip' => $request->ip(),
        ]);

        // Authenticate against external API
        $user = $this->apiAuth->authenticate(
            $request->username,
            $request->password
        );

        if (! $user) {
            $apiError = $this->apiAuth->lastError ?? 'Unknown API error';
            $apiUrl = $this->apiAuth->lastApiUrl ?? 'Unknown URL';
            $statusCode = $this->apiAuth->lastStatusCode ?? 0;

            Log::warning('API authentication failed', [
                'username' => $request->username,
                'api_url' => $apiUrl,
                'api_error' => $apiError,
                'status_code' => $statusCode,
            ]);

            return back()->withErrors([
                'username' => 'These credentials do not match our records.',
                'api_debug' => json_encode([
                    'api_url' => $apiUrl,
                    'api_error' => $apiError,
                    'status_code' => $statusCode,
                ]),
            ])->onlyInput('username');
        }

        // Log the user in
        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        Log::info('User logged in successfully', [
            'user_id' => $user->id,
            'username' => $request->username,
            'email' => $user->email,
        ]);

        return redirect()->intended('/dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): \Illuminate\Http\RedirectResponse
    {
        Log::info('User logging out', [
            'user_id' => Auth::id(),
        ]);

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
