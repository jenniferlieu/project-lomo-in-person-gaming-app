<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BeaconCreationTest extends TestCase
{
    /**
     * Tests the post request to the '/api/beacons' route to create a new beacon.
     * Should return success status code 201 for successful resource creation.
     */
    public function test_post_request_returns_successful_response(): void
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json'
        ])->post('/api/beacons', [
            'host_id' => '0',
            'title' => 'Smash brothers',
        ]);

        $response->assertStatus(201);
    }

    /**
     * Tests that validation checks fail on the POST request for beacons.
     * Should return a 422 status code for unprocessable entity.
     */
    public function test_validation_should_fail_on_insufficient_post_request(): void
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json'
        ])->post('/api/beacons', [
            'host_id' => '',  // host_id is required and cannot be empty string
            'title' => '', // title is required and cannot be empty string
        ]);

        $response->assertStatus(422);
    }
}
