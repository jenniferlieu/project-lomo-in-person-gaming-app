<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;
use App\Models\User;
use App\Models\Beacon;
use App\Events\BeaconCreated;
use Mockery;
use Psr\Http\Message\ResponseInterface;

class BeaconControllerTest extends TestCase {
    use WithFaker;
    use RefreshDatabase; // clears the entire database after each test

    public User $user;
    public Beacon $beacon;
    public ResponseInterface $mockTwitchResponse;

    /**
     * Set up the test environment
     */
    public function setUp(): void {
        parent::setUp(); // required

        // setup code begins here

        // mock authentication for sanctum
        $this->user = User::factory()->create(); // create a mock user
        $this->actingAs($this->user, 'sanctum'); // create a mock token from sanctum

        // create a mock beacon JSON replacing coordinates with latitude and longitude
        $this->beacon = Beacon::factory()->make([
            'host_id' => $this->user->id
        ]);
        unset($this->beacon['coordinates']); // delete the coordindates field

        // create mock events
        Event::fake([BeaconCreated::class]);

        // create mock Twitch response
        $this->mockTwitchResponse = Mockery::mock(ResponseInterface::class);
        $this->mockTwitchResponse->shouldReceive('getStatusCode')->andReturn(200);
        $this->mockTwitchResponse->shouldReceive('getBody')->andReturn(json_encode([
            'data' => [
                [
                    "id" => "33214",
                    "name" => "Fortnite",
                    "box_art_url" => "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
                    "igdb_id" => "1905"
                ],
            ]
        ]));
    }

    /**
     * Tests the post request to the '/api/beacons' route to create a new beacon.
     * Should return success status code 201 for successful resource creation.
     */
    public function test_post_beacon_request_returns_successful_response(): void {
        Twitch::shouldReceive('getGames')
            ->once()
            ->andReturn(new Result($this->mockTwitchResponse));

        // set fake latitude and longitude here to avoid async problems
        $this->beacon['latitude'] = $this->faker->latitude(); // add latitude field
        $this->beacon['longitude'] = $this->faker->longitude(); // add longitude field
        $response = $this->postJson('/api/beacons', $this->beacon->toArray());
        $response->assertStatus(201);
    }

    /**
     * Tests that validation checks fail on the POST request for beacons.
     * Should return a 422 status code for unprocessable entity.
     */
    public function test_post_beacon_request_fails_when_required_fields_are_empty(): void {
        $response = $this->postJson('/api/beacons');

        $response->assertStatus(422);
    }

    /**
     * Test get all beacons
     * Should return a status code of 200 and returns an array of beacons
     */
    public function test_get_all_beacons(): void {
        $response = $this->getJson('/api/beacons');

        $response->assertStatus(200);
    }

    /**
     * Test get all beacons
     * Should return a status code of 200 and returns an array of beacons
     */
    public function test_beacon_created_event_dispatched(): void {
        Twitch::shouldReceive('getGames')
            ->once()
            ->andReturn(new Result($this->mockTwitchResponse));

        // set fake latitude and longitude here to avoid async problems
        $this->beacon['latitude'] = $this->faker->latitude(); // add latitude field
        $this->beacon['longitude'] = $this->faker->longitude(); // add longitude field
        $this->postJson('/api/beacons', $this->beacon->toArray());
        Event::assertDispatched(BeaconCreated::class);
    }
}
