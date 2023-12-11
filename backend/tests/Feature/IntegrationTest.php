<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use App\Models\Beacon;
use App\Events\BeaconCreated;
use Illuminate\Support\Facades\Event;
use App\Events\AttendeeCreate;
use App\Events\CommentCreated;

class IntegrationTest extends TestCase
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

        // make api calls from frontend url's
        $this->withHeaders([
            'HTTP_ORIGIN' => 'https://lomogaming.netlify.app',
            'Accept' => 'application/json'
        ]);
    }

    /**
     * Test user can create an account
     */
    public function test_user_can_create_an_account(): void
    {
        $userData = [
            "email" => "test@example.com",
            "password" => "password",
            "password_confirmation" => "password",
            "username" => "testuser"
        ];

        $response = $this->json('POST', 'register', $userData);

        $response->assertStatus(201)
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

    /**
     * Test user can login
     */
    public function test_user_can_login(): void
    {
        User::create([
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'username' => 'testuser'
        ]);

        $loginData = ['email' => 'test@example.com', 'password' => 'password'];

        $response = $this->json('POST', 'login', $loginData);

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

    /**
     * Test user can create a beacon
     */
    public function test_user_can_create_a_beacon(): void
    {
        // create a mock token from sanctum
        $user = User::factory()->create(); // create a mock user
        $this->actingAs($user, 'sanctum'); // create a mock token from sanctum

        // create a mock beacon JSON replacing coordinates with latitude and longitude
        $beacon = Beacon::factory()->make([
            'host_id' => $user->id
        ]);
        unset($beacon['coordinates']); // delete the coordindates field
        $beacon['latitude'] = "1.000000"; // add latitude field
        $beacon['longitude'] = "1.000000"; // add longitude field
        $beacon['controllers_brought'] = $this->faker->numberBetween(0, 10);

        // create mock events
        Event::fake([BeaconCreated::class]);

        // make api call
        $response = $this->postJson('/api/beacons', $beacon->toArray());

        // make assertions
        $response->assertStatus(201);
        Event::assertDispatched(BeaconCreated::class);
    }

    /**
     * Test user can join a beacon
     */
    public function test_user_can_join_a_beacon(): void
    {
        // create a mock token from sanctum
        $user = User::factory()->create(); // create a mock user
        $this->actingAs($user, 'sanctum'); // create a mock token from sanctum

        // create a mock beacon JSON replacing coordinates with latitude and longitude
        $beacon = Beacon::factory()->create([
            'host_id' => $user->id
        ]);
        unset($beacon['coordinates']); // delete the coordindates field
        $beacon['latitude'] = "1.000000"; // add latitude field
        $beacon['longitude'] = "1.000000"; // add longitude field
        $beacon['controllers_brought'] = $this->faker->numberBetween(0, 10);

        // create mock attendee
        $attendee = [
            'beacon_id' => $beacon->id,
            'user_id' => $user->id,
            'controllers_brought' => 3
        ];

        // create mock events
        Event::fake([AttendeeCreate::class]);

        // make api call
        $response = $this->postJson('/api/attendees', $attendee);

        // make assertions
        $response->assertStatus(201);
    }

    /**
     * Test user can comment on a beacon
     */
    public function test_user_can_comment_on_a_beacon(): void
    {
        // create a mock token from sanctum
        $user = User::factory()->create(); // create a mock user
        $this->actingAs($user, 'sanctum'); // create a mock token from sanctum

        // create a mock beacon JSON replacing coordinates with latitude and longitude
        $beacon = Beacon::factory()->create([
            'host_id' => $user->id
        ]);
        unset($beacon['coordinates']); // delete the coordindates field
        $beacon['latitude'] = "1.000000"; // add latitude field
        $beacon['longitude'] = "1.000000"; // add longitude field
        $beacon['controllers_brought'] = $this->faker->numberBetween(0, 10);

        // create mock comment
        $comment = [
            'content' => 'test body comment',
        ];

        // create mock events
        Event::fake([CommentCreated::class]);

        // make api call
        $url = 'api/beacons/' . $beacon->id . '/comments';
        $response = $this->postJson($url, $comment);

        // make assertions
        $response->assertStatus(201);
        Event::assertDispatched(CommentCreated::class);
    }

}
