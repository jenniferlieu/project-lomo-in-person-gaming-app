<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;
use App\Models\User;
use App\Models\Beacon;
use MongoDB\BSON\ObjectId;
use App\Events\BeaconCreated;

class BeaconControllerTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

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
        $this->user->id = new ObjectId(); // give the mock user a mongodb id
        $this->actingAs($this->user, 'sanctum'); // create a mock token from sanctum
    }

    /**
     * Tests the post request to the '/api/beacons' route to create a new beacon.
     * Should return success status code 201 for successful resource creation.
     */
    public function test_post_beacon_request_returns_successful_response(): void
    {
        // create a mock beacon
        $beacon = Beacon::factory()->make([
            'host_id' => $this->user->id, // set the host_id
        ]);

        $response = $this->postJson('/api/beacons', $beacon->toArray());

        $response->assertStatus(201)->assertJsonStructure([
            'data' => [
                'host_id',
                'title',
                'game_title',
                'game_system',
                'description',
                'start_date_time',
                'end_date_time',
                'address',
                'latitude',
                'longitude',
                'num_players',
                'created_at',
                'updated_at',
                '_id'
            ]
        ]);
    }

    /**
     * Tests that validation checks fail on the POST request for beacons.
     * Should return a 422 status code for unprocessable entity.
     */
    public function test_post_beacon_request_fails_when_required_fields_are_empty(): void
    {
        $response = $this->postJson('/api/beacons');

        $response->assertStatus(422)->assertInvalid([
            'host_id',
            'title',
            'game_title',
            'start_date_time',
            'end_date_time',
            'address',
            'latitude',
            'longitude'
        ]);
    }

    /**
     * Test get all beacons
     * Should return a status code of 200 and returns an array of beacons
     */
    public function test_get_all_beacons(): void {
        $response = $this->getJson('/api/beacons');

        $response->assertStatus(200)->assertJsonIsArray('data');
    }

    /**
     * Test get all beacons
     * Should return a status code of 200 and returns an array of beacons
     */
    public function test_beacon_created_event_dispatched(): void
    {

        Event::fake([BeaconCreated::class]);

        // create a mock beacon
        $beacon = Beacon::factory()->make([
            'host_id' => $this->user->id, // set the host_id
        ]);

        $response = $this->postJson('/api/beacons', $beacon->toArray());

        Event::assertDispatched(BeaconCreated::class);
    }
}
