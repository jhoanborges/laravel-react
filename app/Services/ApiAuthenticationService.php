<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ApiAuthenticationService
{
    private string $apiUrl;

    public function __construct()
    {
        $this->apiUrl = config('app.api_url');
    }

    public ?string $lastError = null;

    public ?int $lastStatusCode = null;

    public ?string $lastApiUrl = null;

    /**
     * Generate temporary password for user via external API
     */
    public function generateTemporaryPassword(string $usuario): bool
    {
        $this->lastError = null;
        $this->lastStatusCode = null;
        $this->lastApiUrl = "{$this->apiUrl}/USR/PWDTMP/GEN";

        // Bypass API in test mode
        if (config('app.test_mode')) {
            Log::info('TEST MODE: Bypassing API temporary password generation', [
                'usuario' => $usuario,
            ]);

            // In test mode, just return success (no email actually sent)
            return true;
        }

        Log::info('Generating temporary password', [
            'usuario' => $usuario,
            'api_url' => $this->lastApiUrl,
        ]);

        try {
            // Encode username to Base64
            $credentials = ['usuario' => $usuario];
            $base64Content = base64_encode(json_encode($credentials));

            Log::debug('Temporary password generation payload', [
                'endpoint' => $this->lastApiUrl,
                'payload_length' => strlen($base64Content),
            ]);

            // Make API request
            $response = Http::timeout(10)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post($this->lastApiUrl, [
                    'Content' => $base64Content,
                ]);

            $this->lastStatusCode = $response->status();

            if (! $response->successful()) {
                $this->lastError = "API request failed with status {$response->status()}: {$response->body()}";

                Log::warning('Temporary password generation request failed', [
                    'usuario' => $usuario,
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'url' => $this->lastApiUrl,
                ]);

                return false;
            }

            // Decode response
            $responseData = $response->json();

            Log::debug('Temporary password generation response', [
                'usuario' => $usuario,
                'status' => $responseData['Status'] ?? 'not set',
            ]);

            // Check if generation was successful
            if (! isset($responseData['Status']) || $responseData['Status'] !== 1) {
                $this->lastError = $responseData['Body'] ?? 'Password generation rejected by API';

                Log::warning('Temporary password generation rejected by API', [
                    'usuario' => $usuario,
                    'status' => $responseData['Status'] ?? 'not set',
                    'error' => $this->lastError,
                    'url' => $this->lastApiUrl,
                ]);

                return false;
            }

            Log::info('Temporary password generated successfully', [
                'usuario' => $usuario,
                'message' => $responseData['Body'] ?? 'OK',
            ]);

            return true;
        } catch (\Exception $e) {
            $this->lastError = "Exception: {$e->getMessage()}";

            Log::error('Temporary password generation exception', [
                'usuario' => $usuario,
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'url' => $this->lastApiUrl,
            ]);

            return false;
        }
    }

    /**
     * Validate token via external API
     */
    public function validateToken(string $token, string $usuario): bool
    {
        $this->lastError = null;
        $this->lastStatusCode = null;
        $this->lastApiUrl = "{$this->apiUrl}/USR/TOKEN";

        // Bypass API in test mode
        if (config('app.test_mode')) {
            Log::info('TEST MODE: Bypassing API token validation', [
                'usuario' => $usuario,
            ]);

            // In test mode, always return true for valid test tokens
            return true;
        }

        Log::info('Validating token', [
            'usuario' => $usuario,
            'api_url' => $this->lastApiUrl,
        ]);

        try {
            // Encode token and username to Base64
            $credentials = [
                'tkn' => $token,
                'usuario' => $usuario,
            ];

            $base64Content = base64_encode(json_encode($credentials));

            Log::debug('Token validation payload', [
                'endpoint' => $this->lastApiUrl,
                'payload_length' => strlen($base64Content),
            ]);

            // Make API request
            $response = Http::timeout(10)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post($this->lastApiUrl, [
                    'Content' => $base64Content,
                ]);

            $this->lastStatusCode = $response->status();

            if (! $response->successful()) {
                $this->lastError = "API request failed with status {$response->status()}: {$response->body()}";

                Log::warning('Token validation request failed', [
                    'usuario' => $usuario,
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'url' => $this->lastApiUrl,
                ]);

                return false;
            }

            // Decode response
            $responseData = $response->json();

            Log::debug('Token validation response', [
                'usuario' => $usuario,
                'status' => $responseData['Status'] ?? 'not set',
            ]);

            // Check if validation was successful
            if (! isset($responseData['Status']) || $responseData['Status'] !== 1) {
                $this->lastError = $responseData['Body'] ?? 'Token validation rejected by API';

                Log::warning('Token validation rejected by API', [
                    'usuario' => $usuario,
                    'status' => $responseData['Status'] ?? 'not set',
                    'error' => $this->lastError,
                    'url' => $this->lastApiUrl,
                ]);

                return false;
            }

            Log::info('Token validated successfully', [
                'usuario' => $usuario,
                'message' => $responseData['Body'] ?? 'OK',
            ]);

            return true;
        } catch (\Exception $e) {
            $this->lastError = "Exception: {$e->getMessage()}";

            Log::error('Token validation exception', [
                'usuario' => $usuario,
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'url' => $this->lastApiUrl,
            ]);

            return false;
        }
    }

    /**
     * Authenticate user against external API
     */
    public function authenticate(string $usuario, string $contrasena): ?User
    {
        $this->lastError = null;
        $this->lastStatusCode = null;
        $this->lastApiUrl = "{$this->apiUrl}/USR/PWD/VAL";

        // Bypass API in test mode
        if (config('app.test_mode')) {
            Log::info('TEST MODE: Bypassing API authentication', [
                'usuario' => $usuario,
            ]);

            return $this->createTestUser($usuario);
        }

        Log::info('API authentication attempt', [
            'usuario' => $usuario,
            'api_url' => $this->apiUrl,
        ]);

        try {
            // Encode credentials to Base64
            $credentials = [
                'usuario' => $usuario,
                'contrasena' => $contrasena,
            ];

            $base64Content = base64_encode(json_encode($credentials));

            Log::debug('API authentication payload', [
                'endpoint' => $this->lastApiUrl,
                'payload_length' => strlen($base64Content),
            ]);

            // Make API request
            $response = Http::timeout(10)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post($this->lastApiUrl, [
                    'Content' => $base64Content,
                ]);

            $this->lastStatusCode = $response->status();

            if (! $response->successful()) {
                $this->lastError = "API request failed with status {$response->status()}: {$response->body()}";

                Log::warning('API authentication request failed', [
                    'usuario' => $usuario,
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'url' => $this->lastApiUrl,
                ]);

                return null;
            }

            // Decode response
            $responseData = $response->json();

            Log::debug('API authentication response', [
                'usuario' => $usuario,
                'status' => $responseData['Status'] ?? 'not set',
                'has_user_data' => isset($responseData['usr']),
                'has_token' => isset($responseData['tkn']),
            ]);

            // Check if authentication was successful
            if (! isset($responseData['Status']) || $responseData['Status'] !== 1) {
                $this->lastError = $responseData['Body'] ?? 'Authentication rejected by API';

                Log::warning('API authentication rejected by API', [
                    'usuario' => $usuario,
                    'status' => $responseData['Status'] ?? 'not set',
                    'error' => $this->lastError,
                    'url' => $this->lastApiUrl,
                ]);

                return null;
            }

            // Extract user data from response
            $userData = $responseData['usr'] ?? [];
            $token = $responseData['tkn'] ?? null;
            $origen = $responseData['origen'] ?? null;

            if (empty($userData) || empty($token)) {
                $this->lastError = 'API response missing required user data or token';

                Log::error('API response missing required data', [
                    'usuario' => $usuario,
                    'response' => $responseData,
                    'url' => $this->lastApiUrl,
                ]);

                return null;
            }

            Log::info('API authentication successful', [
                'usuario' => $usuario,
                'nombre_completo' => $userData['nombre_completo'] ?? 'unknown',
                'origen' => $origen,
            ]);

            // Create or update local user
            return $this->syncUser($userData, $token, $origen);
        } catch (\Exception $e) {
            $this->lastError = "Exception: {$e->getMessage()}";

            Log::error('API authentication exception', [
                'usuario' => $usuario,
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'url' => $this->lastApiUrl,
            ]);

            return null;
        }
    }

    /**
     * Create test user for local development/testing
     */
    private function createTestUser(string $usuario): User
    {
        $email = "{$usuario}@test.local";

        Log::info('Creating/updating test user', [
            'usuario' => $usuario,
            'email' => $email,
        ]);

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => ucfirst($usuario),
                'password' => bcrypt('password'), // Default test password
                'api_token' => 'test_token_'.$usuario,
                'origen' => 1,
                'grupo' => 'TEST',
                'interno_externo' => 'I',
                'clave_ejecutivo' => null,
                'clave_empleado' => $usuario,
                'telefono' => null,
                'fecha_ultimo_login' => now(),
                'email_verified_at' => now(),
            ]
        );

        return $user;
    }

    /**
     * Sync user data from API to local database
     */
    private function syncUser(array $userData, string $token, ?int $origen): User
    {
        $usuario = $userData['usuario'];
        $email = $userData['correo_electronico'] ?? "{$usuario}@value.local";

        // Parse fecha_ultimo_login from API format (MM/DD/YYYY HH:mm:ss a. m./p. m.)
        $fechaUltimoLogin = null;
        if (! empty($userData['fecha_ultimo_login'])) {
            try {
                $fechaUltimoLogin = \Carbon\Carbon::createFromFormat(
                    'm/d/Y h:i:s a. m.',
                    $userData['fecha_ultimo_login']
                );
            } catch (\Exception $e) {
                // Try alternative format with p. m.
                try {
                    $fechaUltimoLogin = \Carbon\Carbon::createFromFormat(
                        'm/d/Y h:i:s p. m.',
                        $userData['fecha_ultimo_login']
                    );
                } catch (\Exception $e) {
                    Log::warning('Could not parse fecha_ultimo_login', [
                        'fecha' => $userData['fecha_ultimo_login'],
                    ]);
                }
            }
        }

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $userData['nombre_completo'] ?? $usuario,
                'password' => bcrypt($token), // Store token hash as password for security
                'api_token' => $token,
                'origen' => $origen,
                'grupo' => $userData['grupo'] ?? null,
                'interno_externo' => $userData['interno_externo'] ?? null,
                'clave_ejecutivo' => $userData['clave_ejecutivo'] ?? null,
                'clave_empleado' => $userData['clave_empleado'] ?? null,
                'telefono' => $userData['telefono'] ?? null,
                'fecha_ultimo_login' => $fechaUltimoLogin ?? now(),
                'email_verified_at' => now(), // Auto-verify since API authenticated
            ]
        );

        return $user;
    }
}
