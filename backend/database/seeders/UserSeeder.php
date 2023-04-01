<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    CONST USERS = [
        ['name' => 'Admin', 'email' => 'admin@mail.com', 'role' => 'admin'],
        ['name' => 'Admin', 'email' => 'client@mail.com', 'role' => 'client'],
        ['name' => 'Admin', 'email' => 'moderator@mail.com', 'role' => 'moderator']
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::USERS as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => Hash::make('secret123'),
                    'role' => $user['role']
                ]
            );
        }
    }
}
