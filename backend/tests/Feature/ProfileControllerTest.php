<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Profile;
use App\Models\User;

class ProfileControllerTest extends TestCase
{
    use RefreshDatabase;

    // public function testShowProfile()
    // {
    //     // Create a user and the corresponding user profile
    //     // Do not simulate user login, instead use an unauthenticated user
    //     $user = User::factory()->create();
    //     $profile = Profile::factory()->create(['user_id' => $user->id]);

    //     // Send a GET request to display the user profile
    //     $response = $this->get("/api/profiles/{$profile->id}");

    //     // Assert that the response is successful and contains the user profile data
    //     $response->assertStatus(200);
    //     $response->assertJson(['data' => $profile->toArray()]);
    // }

    // public function testUpdateProfile()
    // {
    //     // Create an unauthenticated user and the corresponding user profile
    //     // Do not simulate user login, instead use an unauthenticated user
    //     $user = User::factory()->create();
    //     $profile = Profile::factory()->create(['user_id' => $user->id]);

    //     // Prepare the data to be updated
    //     $updatedData = [
    //         'about_me' => 'Updated About Me',
    //         'preferred_games' => ['Game A', 'Game B'],
    //         'preference_tags' => ['Tag 1', 'Tag 2'],
    //     ];

    //     // Send a PUT request to update the user profile
    //     $response = $this->put("/api/profiles/{$profile->id}", $updatedData);

    //     // Assert that the response is successful and contains the updated user profile data
    //     $response->assertStatus(200);
    //     $response->assertJson(['message' => 'Profile updated successfully', 'data' => $updatedData]);

        $dbData = [
            'about_me' => $updatedData['about_me'],
            'preferred_games' => '{' . implode(',', $updatedData['preferred_games']) . '}',
            'preference_tags' => '{' . implode(',', $updatedData['preference_tags']) . '}',
        ];

        // Send a PUT request to update the user profile
        $response = $this->put("/api/profiles/{$profile->id}", $updatedData);

        // Assert that the response is successful and contains the updated user profile data
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Profile updated successfully', 'data' => $updatedData]);

        $dbData = [
            'about_me' => $updatedData['about_me'],
            'preferred_games' => '{' . implode(',', $updatedData['preferred_games']) . '}',
            'preference_tags' => '{' . implode(',', $updatedData['preference_tags']) . '}',
        ];

        // Verify that the user profile in the database has been updated
        $this->assertDatabaseHas('profiles', $dbData);
    }
}
