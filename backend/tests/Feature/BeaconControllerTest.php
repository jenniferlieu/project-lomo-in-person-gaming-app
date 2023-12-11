<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;
use App\Models\User;
use App\Models\Beacon;
use App\Events\BeaconCreated;

class BeaconControllerTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase; // clears the entire database after each test

    public User $user;
    public Beacon $beacon;

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

        // create a mock beacon JSON replacing coordinates with latitude and longitude
        $this->beacon = Beacon::factory()->make([
            'host_id' => $this->user->id
        ]);
        unset($this->beacon['coordinates']); // delete the coordindates field
        $this->beacon['latitude'] = "1.000000"; // add latitude field
        $this->beacon['longitude'] = "1.000000"; // add longitude field
        $this->beacon['controllers_brought'] = $this->faker->numberBetween(0, 10);

        // create mock events
        Event::fake([BeaconCreated::class]);
    }

    /**
     * Tests the post request to the '/api/beacons' route to create a new beacon.
     * Should return success status code 201 for successful resource creation.
     */
    public function test_post_beacon_request_returns_successful_response(): void
    {
        $response = $this->postJson('/api/beacons', $this->beacon->toArray());
        $response->assertStatus(201);
    }

    /**
     * Tests that validation checks fail on the POST request for beacons.
     * Should return a 422 status code for unprocessable entity.
     */
    public function test_post_beacon_request_fails_when_required_fields_are_empty(): void
    {
        $response = $this->postJson('/api/beacons');

        $response->assertStatus(422);
    }

    /**
     * Test get all beacons
     * Should return a status code of 200 and returns an array of beacons
     */
    public function test_get_all_beacons(): void
    {
        $response = $this->getJson('/api/beacons');

        $response->assertStatus(200);
    }

    /**
     * Test get all beacons
     * Should return a status code of 200 and returns an array of beacons
     */
    public function test_beacon_created_event_dispatched(): void
    {
        $this->postJson('/api/beacons', $this->beacon->toArray());
        Event::assertDispatched(BeaconCreated::class);
    }
}
