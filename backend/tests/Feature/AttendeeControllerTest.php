<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Beacon;
use App\Models\Attendee;

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

              // create a mock beacon JSON replacing coordinates with latitude and longitude
        $this->beacon = Beacon::factory()->make([
            'host_id' => $this->user->id
        ]);
        unset($this->beacon['coordinates']); // delete the coordindates field
        $this->beacon['latitude'] = "1.000000"; // add latitude field
        $this->beacon['longitude'] = "1.000000"; // add longitude field
     }

    public function test_get_all_attendees(): void
    {
        $beacon1 = Beacon::factory()->create();
        $beacon2 = Beacon::factory()->create();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $attendee1 = Attendee::create(['beacon_id' => $beacon1->id, 'user_id' => $user1->id, 'controllers_brought' => 3]);
        $attendee2 = Attendee::create(['beacon_id' => $beacon2->id, 'user_id' => $user2->id, 'controllers_brought' => 1]);
        $response = $this->call('GET','api/attendees');
        $response->assertStatus(200);
    }

    public function test_delete_attendee(): void
    {
        $user_id = User::factory()->create();
        $beacon_id = Beacon::factory()->create();
        $attendee = Attendee::create(['beacon_id' => $beacon_id->id, 'user_id' => $user_id->id, 'controllers_brought' => 3]);
        $response = $this->delete("api/attendees/{$user_id->id}/beacon/{$beacon_id->id}");
        $response->assertStatus(200);
    }

    public function test_store_attendee(): void
    {
        $beacon = Beacon::factory()->create();
        $user = User::factory()->create();
        $attendee = [
            'beacon_id' => $beacon->id,
            'user_id' => $user->id,
            'controllers_brought' => 3
        ];
        $response = $this->postJson('/api/attendees', $attendee);
        $response->assertStatus(201);
    }

    public function test_update_attendee(): void  
    {
        $beacon = Beacon::factory()->create();
        $user = User::factory()->create();
        $attendee = Attendee::create(['beacon_id' => $beacon->id, 'user_id' => $user->id, 'controllers_brought' => 3]);
        $updateControllers = [
            'controllers_brought' => 4
        ];
        $response = $this->patch("api/attendees/{$user->id}/beacon/{$beacon->id}", $updateControllers);
        $response->assertStatus(200);
    }

    public function test_show_attendee(): void 
    {
        $beacon = Beacon::factory()->create();
        $user = User::factory()->create();
        $attendee = Attendee::create(['beacon_id' => $beacon->id, 'user_id' => $user->id, 'controllers_brought' => 1]);
        $response = $this->get("api/attendees/{$beacon->id}");
        $response->assertStatus(200);
    }
}
