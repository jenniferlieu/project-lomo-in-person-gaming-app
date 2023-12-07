<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testRegister()
    {
        $userData = [
            "email" => "test@example.com",
            "password" => "password",
            "password_confirmation" => "password",
            "username" => "testuser"
        ];

        $response = $this->json('POST', '/api/register', $userData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                "data" => [
                    "email",
                    "username",
                    "updated_at",
                    "created_at",
                    "id"
                ]
            ]);
    }

    public function testLogin()
    {
        $user = User::create([
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'username' => 'testuser'
        ]);

        $loginData = ['email' => 'test@example.com', 'password' => 'password'];

        $response = $this->json('POST', '/api/login', $loginData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                "token",
                "user" => [
                    "email",
                    "username",
                    "updated_at",
                    "created_at",
                    "id"
                ]
            ]);
    }
}
