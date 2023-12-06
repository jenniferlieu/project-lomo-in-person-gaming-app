<?php

namespace App\Http\Controllers;

use App\Events\BeaconCreated;
use App\Http\Requests\BeaconPostRequest;
use App\Http\Resources\BeaconJsonResponse;
use App\Http\Requests\BeaconUpdateRequest;
use App\Models\Attendee;
use Illuminate\Http\Request;
use App\Models\Beacon;
use Clickbar\Magellan\Data\Geometries\Point;
use Illuminate\Support\Facades\DB;

class BeaconController extends Controller {
    /**
     * Display a listing of the Beacon.
     * @lrd:start
     * Get an array of all beacons
     * @lrd:end
     */
    public function index() {
        // Gets all beacons from the database
        return response()->json(['data' => BeaconJsonResponse::collection(Beacon::all())], 200);
    }

    /**
     * Store a newly created Beacon in storage.
     * @lrd:start
     * Creates a new Beacon
     * - **host_id** : user_id of the user creating the beacon; user_id must exist
     * - **game_title** : title of the game being played at the event
     * - **console** : such as PC, Nintendo Switch, Xbox, etc.
     * - **description** : information about the event
     * - **start_date_time** : when the event will start; example format = 12/12/23 1:00pm
     * - **end_date_time** : when the event will end; example format = 12/12/23 1:00pm
     * - **place_name** : name of the place / meeting location
     * - **street_address** : street address of the meeting location
     * - **latitude** : GPS latitude of the address
     * - **longitude** : GPS longitude of the address
     * - **players_wanted** : number of players needed
     * - **controllers_wanted** : number of conotrollers needed
     * @lrd:end
     */
    public function store(BeaconPostRequest $request) {
        // Modify JSON request to fit in the database
        $beaconRequest = $request->all();
        $beaconRequest['coordinates'] = Point::makeGeodetic($beaconRequest['latitude'], $beaconRequest['longitude']);
        unset($beaconRequest['latitude']); // remove latitude field
        unset($beaconRequest['longitude']); // remove longitude field

        // Insert new beacons into storage
        $beacon = Beacon::create($beaconRequest);

        // Add host as the first attendee
        Attendee::create([
            'beacon_id' => $beacon['id'],
            'user_id' => $beacon['host_id'],
            'controllers_brought' => 0
        ]);

        // Transform JSON returned from database into the same JSON format request received
        // Remove coordinates field and replace it with latitude and longitude
        $beaconJson = new BeaconJsonResponse($beacon);

        // Push new beacon data through websocket to all users
        event(new BeaconCreated($beaconJson));

        // Returns data on the new beacon created and a success status code
        return response()->json(['data' => $beaconJson], 201); // 201 Request fulfilled and new resource created
    }

    /**
     * Display the specified Beacon.
     */
    public function show(string $beacon_id) {
        $beaconInfo = array();
        $beacon = Beacon::find($beacon_id);
        array_push($beaconInfo, $beacon);
        $attendeeTable = DB::table('attendees')->where('beacon_id', $beacon_id)->get(['user_id', 'controllers_brought']);
        $joinTables = DB::table('attendees')->select('attendees.user_id', 'users.username', 'users.avatar', 'attendees.controllers_brought')
            ->join('users', 'users.id', '=', 'attendees.user_id')->where('beacon_id', $beacon_id)->get();
        array_push($beaconInfo, response()->json(['attendees' => $joinTables], 200)->getData());
        return response()->json(['data' => $beaconInfo], 200);
    }

    /**
     * Update the specified Beacon in storage.
     */
    public function update(BeaconUpdateRequest $request, string $beacon_id) {
        $beacon = Beacon::find($beacon_id);
        if(!$beacon) {
            return response()->json(['error' => 'Beacon not found'], 404);
        }
        $validatedData = $request->validate([
            'host_id' => 'string',
            'title' => 'string',
            'game_title' => 'string',
            'description' => 'string',
            'start_date_time' => 'date',
            'end_date_time' => 'date',
            'address' => 'string',
            'latitude' => 'numeric',
            'longitude' => 'numeric',
            'num_players' => 'integer',
            'controllers_wanted' => 'integer'
        ]);
        $beacon->fill($validatedData);
        if($beacon->save()) {
            return response()->json(['message' => "Beacon updated successfully", 'data' => $beacon], 200);
        } else {
            return response()->json(['error' => 'Failed to update beacon'], 500);
        }
    }

    /**
     * Remove the specified Beacon from storage.
     */
    public function destroy(string $beacon_id) {
        $beacon = Beacon::find($beacon_id);

        if(!$beacon) {
            return response()->json(['error' => 'Beacon not found'], 400);
        }
        if($beacon->delete()) {
            return response()->json(['message' => 'Beacon deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Failed to delete beacon'], 500);
        }
    }
}
