<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ApiClient
{
    private string $apiUrl;

    public function __construct()
    {
        $this->apiUrl = config('app.api_url');
    }

    /**
     * Make an authenticated API request
     */
    public function request(string $method, string $endpoint, ?string $token = null, array $data = []): ?array
    {
        try {
            $headers = [
                'Content-Type' => 'application/json',
            ];

            if ($token) {
                $headers['Authorization'] = "Bearer {$token}";
            }

            $response = Http::timeout(10)
                ->withHeaders($headers)
                ->$method("{$this->apiUrl}{$endpoint}", $data);

            if (! $response->successful()) {
                Log::warning('API request failed', [
                    'method' => $method,
                    'endpoint' => $endpoint,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return null;
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error('API request exception', [
                'method' => $method,
                'endpoint' => $endpoint,
                'message' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Make POST request
     */
    public function post(string $endpoint, ?string $token = null, array $data = []): ?array
    {
        return $this->request('post', $endpoint, $token, $data);
    }

    /**
     * Make GET request
     */
    public function get(string $endpoint, ?string $token = null): ?array
    {
        return $this->request('get', $endpoint, $token);
    }
}
