<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Mockery;
use Psr\Http\Message\ResponseInterface;

class GameControllerTest extends TestCase {
    public User $user;
    public ResponseInterface $mockTwitchResponse;
    public array $mockGameData;

    /**
     * Set up the test environment
     */
    public function setUp(): void {
        parent::setUp(); // required

        // setup code begins here
        // mock authentication for sanctum
        $this->user = User::factory()->create(); // create a mock user
        $this->actingAs($this->user, 'sanctum'); // create a mock token from sanctum

        // Prevent real requests
        // Http::preventStrayRequests();

        // create mock Twitch response
        $this->mockTwitchResponse = Mockery::mock(ResponseInterface::class);
        $this->mockTwitchResponse->shouldReceive('getStatusCode')->andReturn(200);

        // create mock fortnite game data
        $this->mockGameData['fortnite'] = [
            "id" => "33214",
            "name" => "Fortnite",
            "box_art_url" => "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
            "igdb_id" => "1905"
        ];
        $this->mockGameData['fortniteFull'] = $this->mockGameData['fortnite'];
        $this->mockGameData['fortniteFull']['box_art_url_full'] = "https://static-cdn.jtvnw.net/ttv-boxart/33214.jpg";

        // mock splatoon game data
        $this->mockGameData['splatoon'] = [
            "id" => "460649",
            "name" => "Splatoon",
            "box_art_url" => "https://static-cdn.jtvnw.net/ttv-boxart/460649_IGDB-{width}x{height}.jpg",
            "igdb_id" => "7335"
        ];
        $this->mockGameData['splatoonFull'] = $this->mockGameData['splatoon'];
        $this->mockGameData['splatoonFull']['box_art_url_full'] = "https://static-cdn.jtvnw.net/ttv-boxart/460649_IGDB.jpg";

        // mock animal crossing game data
        $this->mockGameData['animalCrossing'] = [
            "id" => "509538",
            "name" => "Animal Crossing: New Horizons",
            "box_art_url" => "https://static-cdn.jtvnw.net/ttv-boxart/509538_IGDB-{width}x{height}.jpg",
            "igdb_id" => "109462"
        ];
        $this->mockGameData['animalCrossingFull'] = $this->mockGameData['animalCrossing'];
        $this->mockGameData['animalCrossingFull']['box_art_url_full'] = "https://static-cdn.jtvnw.net/ttv-boxart/509538_IGDB.jpg";
    }

    /**
     * Test games api gets games by name
     */
    public function test_games_api_gets_games_by_name(): void {
        $this->mockTwitchResponse->shouldReceive('getBody')->andReturn(json_encode([
            'data' => [$this->mockGameData['fortnite'], $this->mockGameData['splatoon'], $this->mockGameData['animalCrossing']]
        ]));

        $mockGameData = [
            'data' => [$this->mockGameData['fortniteFull'], $this->mockGameData['splatoonFull'], $this->mockGameData['animalCrossingFull']]
        ];

        Twitch::shouldReceive('getGames')
            ->once()
            ->andReturn(new Result($this->mockTwitchResponse));
        $response = $this->call('GET', '/api/games', [
            'name' => $this->mockGameData['fortnite']['name'].'.'.$this->mockGameData['splatoon']['name'].'.'.$this->mockGameData['animalCrossing']['name'],
        ]);
        $response->assertStatus(200)->assertJson($mockGameData);
    }

    /**
     * Test games api gets games by id
     */
    public function test_games_api_gets_games_by_id(): void {
        $this->mockTwitchResponse->shouldReceive('getBody')->andReturn(json_encode([
            'data' => [$this->mockGameData['fortnite'], $this->mockGameData['splatoon'], $this->mockGameData['animalCrossing']]
        ]));

        $mockGameData = [
            'data' => [$this->mockGameData['fortniteFull'], $this->mockGameData['splatoonFull'], $this->mockGameData['animalCrossingFull']]
        ];

        Twitch::shouldReceive('getGames')
            ->once()
            ->andReturn(new Result($this->mockTwitchResponse));
        $response = $this->call('GET', '/api/games', [
            'id' => $this->mockGameData['fortnite']['id'].'.'.$this->mockGameData['splatoon']['id'].'.'.$this->mockGameData['animalCrossing']['id'],
        ]);
        $response->assertStatus(200)->assertJson($mockGameData);
    }

    /**
     * Test games api gets games by igdb_id
     */
    public function test_games_api_gets_games_by_igbd_id(): void {
        $this->mockTwitchResponse->shouldReceive('getBody')->andReturn(json_encode([
            'data' => [$this->mockGameData['fortnite'], $this->mockGameData['splatoon'], $this->mockGameData['animalCrossing']]
        ]));

        $mockGameData = [
            'data' => [$this->mockGameData['fortniteFull'], $this->mockGameData['splatoonFull'], $this->mockGameData['animalCrossingFull']]
        ];

        Twitch::shouldReceive('getGames')
            ->once()
            ->andReturn(new Result($this->mockTwitchResponse));
        $response = $this->call('GET', '/api/games', [
            'igdb_id' => $this->mockGameData['fortnite']['igdb_id'].'.'.$this->mockGameData['splatoon']['igdb_id'].'.'.$this->mockGameData['animalCrossing']['igdb_id'],
        ]);
        $response->assertStatus(200)->assertJson($mockGameData);
    }
}
