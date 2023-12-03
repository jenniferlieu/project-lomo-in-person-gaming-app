<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use Illuminate\Http\Client\Request;
use romanzipp\Twitch\Facades\Twitch;
use Mockery;

class GameControllerTest extends TestCase
{
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

        // Prevent real requests
        Http::preventStrayRequests();
    }
    /**
     * Test games api
     */
    public function test_games_api(): void
    {
        $mockGameData = [
            'data' => [
                "id" => "33214",
                "name" => "Fortnite",
                "box_art_url" => "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
                "igdb_id" => "1905",
                "box_art_url_full" => "https://static-cdn.jtvnw.net/ttv-boxart/33214.jpg"
            ]
        ];

        Http::fake([
            'api/games?*' => Http::response($mockGameData, 200),
            'https://api.twitch.tv/helix/*' => Http::response($mockGameData, 200),
        ]);

        $response = Http::get('api/games?name=fortnite');
        $this->assertEquals($response->json(), $mockGameData);
    }
}
