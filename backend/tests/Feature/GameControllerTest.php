<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use App\Models\User;
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
    }

    public function test_get_games_by_name_games_api()
    {
        $mockGameData = [
            [
                "id" => 210677,
                "cover" => [
                    "id" => 233937,
                    "url" => "//images.igdb.com/igdb/image/upload/t_cover_big/co50i9.jpg"
                ],
                "name" => "Smash Bros. Rumble"
            ]
        ];
        Http::preventStrayRequests();
        Http::fake([
            'https://api.igdb.com/v4/*' => Http::response($mockGameData, 200),
            'api/games/*' => Http::response($mockGameData, 200),
        ]);

        $response = Http::get('api/games/smash bros');
        $this->assertEquals($mockGameData, $response->json());
    }
}
