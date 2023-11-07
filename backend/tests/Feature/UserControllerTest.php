<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use WithFaker;

    public User $user;

    /**
     * Set up the test environment
     */
    public function setUp(): void
    {
        parent::setUp(); // required

        // setup code begins here

        // mock authentication for sanctum
        $this->user = User::factory()->make(); // create a mock user
        $this->actingAs($this->user, 'sanctum'); // create a mock token from sanctum
    }

    /**
     * Test get all users
     * Should return a status code of 200 and returns an array of users
     */
    public function test_get_all_users(): void {
        $response = $this->getJson('/api/users');

        $response->assertStatus(200);
    }
}
