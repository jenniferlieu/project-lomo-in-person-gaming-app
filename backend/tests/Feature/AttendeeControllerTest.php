<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AttendeeControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
     public function setUp(): void
     {
         parent::setUp(); // required
 
         // setup code begins here
 
         // mock authentication for sanctum
         $this->user = User::factory()->create(); // create a mock user
         $this->actingAs($this->user, 'sanctum'); // create a mock token from sanctum
     }

    public function get_all_attendees(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
