<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Profile;
use App\Models\User;

class ProfileControllerTest extends TestCase {
    use RefreshDatabase;

    public User $user;

    /**
     * Set up the test environment
     */
    public function setUp(): void {
        parent::setUp(); // required

        // setup code begins here

        // mock authentication for sanctum
        $this->user = User::factory()->create(); // create a mock user
        $this->actingAs($this->user, 'sanctum'); // create a mock token from sanctum
    }

    public function testIndexProfiles() {
        // Create multiple users and corresponding profiles
        $users = User::factory()->count(3)->create();
        $users->each(function ($user) {
            Profile::factory()->create(['user_id' => $user->id]);
        });

        // Send a GET request to get all profiles
        $response = $this->get('/api/profiles');

        // Assert that the response status is 200 OK
        $response->assertStatus(200);

        // Assert that the response contains all the created profiles
        $profiles = Profile::all();
        $response->assertJson(['data' => $profiles->toArray()]);
    }

    public function testShowProfile() {
        // Create a user and the corresponding user profile
        // Do not simulate user login, instead use an unauthenticated user
        $user = User::factory()->create();
        $profile = Profile::factory()->create(['user_id' => $user->id]);

        // Send a GET request to display the user profile
        $response = $this->get("/api/profiles/{$user->id}");

        // Assert that the response is successful and contains the user profile data
        $response->assertStatus(200);
        $response->assertJson(['data' => $profile->toArray()]);
    }

    public function testDestroyProfile() {
        // Create a user and a corresponding profile
        $user = User::factory()->create();
        $profile = Profile::factory()->create(['user_id' => $user->id]);

        // Send a DELETE request to delete the profile
        $response = $this->delete("/api/profiles/{$user->id}");

        // Assert that the response status code is 200 OK
        $response->assertStatus(200);

        // Assert that the profile has been deleted from the database
        $this->assertDatabaseMissing('profiles', ['id' => $profile->id]);
    }

    public function testUpdateProfile() {
        // Create an unauthenticated user and the corresponding user profile
        // Do not simulate user login, instead use an unauthenticated user
        $user = User::factory()->create();
        $profile = Profile::factory()->create(['user_id' => $user->id]);

        // Prepare the data to be updated
        $updatedData = [
            'about_me' => 'Updated About Me',
            'preferred_games' => ['Game A', 'Game B'],
            'preference_tags' => ['Tag 1', 'Tag 2'],
        ];

        // Send a PUT request to update the user profile
        $response = $this->put("/api/profiles/{$user->id}", $updatedData);

        // Assert that the response is successful and contains the updated user profile data
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Profile updated successfully', 'data' => $updatedData]);

        $dbData = [
            'about_me' => $updatedData['about_me'],
            'preferred_games' => '{'.implode(',', $updatedData['preferred_games']).'}',
            'preference_tags' => '{'.implode(',', $updatedData['preference_tags']).'}',
        ];

        // Verify that the user profile in the database has been updated
        $this->assertDatabaseHas('profiles', $dbData);
    }

    public function testStoreProfile() {
        // Create a user to associate with the new profile
        $user = User::factory()->create();

        // Prepare the data for the new profile
        $profileData = [
            'user_id' => $user->id,
            'about_me' => 'New About Me',
            'preferred_games' => ['Game1', 'Game2'],
            'preference_tags' => ['Tag1', 'Tag2']
        ];

        // Send a POST request to store the new profile
        $response = $this->postJson('/api/profiles', $profileData);

        // Assert the response status is 201 Created
        $response->assertStatus(201);

        // Assert the response contains the profile data
        $response->assertJson(['message' => 'Profile created successfully', 'data' => $profileData]);

        // Verify that the profile is now in the database
        $this->assertDatabaseHas('profiles', [
            'user_id' => $profileData['user_id'],
            'about_me' => 'New About Me'
        ]);
    }
}
