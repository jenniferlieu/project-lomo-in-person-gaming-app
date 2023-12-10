<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase; // clears the entire database after each test

    public User $user;

    /**
     * Set up the test environment
     */
    public function setUp(): void
    {
        parent::setUp(); // required

        // setup code begins here

        // mock authentication for sanctum
        $this->user = User::factory()->create(); // create a mock user
        $this->actingAs($this->user, 'sanctum'); // create a mock token from sanctum

        // make api calls from frontend url's
        $this->withHeaders([
            'HTTP_ORIGIN' => 'https://lomogaming.netlify.app',
            'Accept' => 'application/json'
        ]);
    }

    /**
     * Test get all users
     * Should return a status code of 200 and returns an array of users
     */
    public function test_get_all_users(): void
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(200);
    }

    /**
     * Test showing an existing user.
     */
    public function test_show_existing_user(): void
    {
        // Create a user to show
        $userToShow = User::factory()->create();
        $response = $this->getJson("/api/users/{$userToShow->id}");

        // Assert the user data was returned successfully
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'id' => $userToShow->id,
                'email' => $userToShow->email,
                'username' => $userToShow->username,
                'avatar' => $userToShow->avatar
            ]
        ]);
    }

    /**
     * Test updating an existing user with valid data.
     */
    // public function test_update_existing_user(): void
    // {
    //     // Create a user to update
    //     $userToUpdate = User::factory()->create();

    //     // New data to update the user
    //     $newData = [
    //         'email' => '123456@example.com',
    //         'username' => 'exampleuser',
    //         'avatar' => 'new_avatar_url'
    //     ];
    //     $response = $this->putJson("/api/users/{$userToUpdate->id}", $newData);

    //     // Assert the user was updated successfully
    //     $response->assertStatus(200);
    //     $response->assertJson(['message' => 'User updated successfully']);

    //     // Assert the user data was updated in the database
    //     $this->assertDatabaseHas('users', [
    //         'id' => $userToUpdate->id,
    //         'email' => '123456@example.com',
    //         'username' => 'exampleuser'
    //     ]);
    // }

    /**
     * Test deleting an existing user.
     */
    public function test_delete_existing_user(): void
    {
        // Create a user to update
        $userToDelete = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$userToDelete->id}");

        // Assert the user was deleted successfully
        $response->assertStatus(200);
        $response->assertJson(['message' => 'User deleted successfully']);

        // Assert the user no longer exists in the database
        $this->assertDatabaseMissing('users', ['id' => $userToDelete->id]);
    }
}
