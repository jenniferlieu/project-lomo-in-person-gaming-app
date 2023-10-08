<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BeaconTest extends TestCase
{
    /**
     * Tests the post request to the '/api/beacons' route to create a new beacon.
     * Should return success status code 201.
     */
    public function test_post_beacons_request(): void
    {
        $response = $this->post('/api/beacons', [
            'host_id' => '0',
            'title' => 'Smash brothers',
        ]);

        $response->assertStatus(201);
    }
}
