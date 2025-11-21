<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create hardcoded user
        User::create([
            'name' => 'Jhoan Borges',
            'username' => 'carment',
            'email' => 'jhoan.borges@hexagun.mx',
            'email_verified_at' => now(),
            'password' => 'Password1',
        ]);

        // Create additional users using factory
        User::factory()
            ->count(10)
            ->withoutTwoFactor()
            ->create();
    }
}
