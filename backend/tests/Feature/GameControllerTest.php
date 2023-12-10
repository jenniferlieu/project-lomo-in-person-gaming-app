<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Http;

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

        // make api calls from frontend url's
        $this->withHeaders([
            'HTTP_ORIGIN' => 'https://lomogaming.netlify.app',
            'Accept' => 'application/json'
        ]);

        // Copied the fake igdb API call from igdb-laravel library's tests/ModelTest.php
        // @see https://github.com/marcreichel/igdb-laravel/blob/main/tests/ModelTest.php
        Http::fake([
            '*/oauth2/token*' => Http::response([
                'access_token' => 'test-suite-token',
                'expires_in' => 3600,
            ]),
            'https://api.igdb.com/v4/*' => Http::response([
                [
                    'cover' => [
                        'id' => 233937,
                        'image_id' => 'co50i9',
                        'url' => '//images.igdb.com/igdb/image/upload/t_thumb/co50i9.jpg'
                    ],
                    'id' => 210677,
                    'name' => 'Smash Bros. Rumble'
                ],
                [
                    'cover' => [
                        'id' => 94749,
                        'image_id' => 'co213x',
                        'url' => '//images.igdb.com/igdb/image/upload/t_thumb/co213x.jpg'
                    ],
                    'id' => 9602,
                    'name' => 'Super Smash Bros. for Wii U'
                ],
                [
                    'id' => 90101,
                    'name' => 'Super Smash Bros. Deluxe'
                ]
            ]),
            '*' => Http::response(),
        ]);
    }

    public function test_get_games_by_name(): void
    {
        $response = $this->getJson('api/games/smash bros');

        $response->assertStatus(200)
            ->assertJson(['data' =>
                [
                    [
                        'cover' => [
                            'id' => 233937,
                            'image_id' => 'co50i9',
                            'url' => '//images.igdb.com/igdb/image/upload/t_cover_big/co50i9.jpg'
                        ],
                        'id' => 210677,
                        'name' => 'Smash Bros. Rumble'
                    ],
                    [
                        'cover' => [
                            'id' => 94749,
                            'image_id' => 'co213x',
                            'url' => '//images.igdb.com/igdb/image/upload/t_cover_big/co213x.jpg'
                        ],
                        'id' => 9602,
                        'name' => 'Super Smash Bros. for Wii U'
                    ],
                    [
                        'id' => 90101,
                        'name' => 'Super Smash Bros. Deluxe'
                    ]
                ]
            ]);
    }
}
