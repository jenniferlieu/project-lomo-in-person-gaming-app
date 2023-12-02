<?php

namespace App\Http\Controllers;

use App\Events\BeaconCreated;
use App\Http\Requests\BeaconPostRequest;
use App\Http\Resources\BeaconJsonResponse;
use Illuminate\Http\Request;
use App\Models\Beacon;
use Clickbar\Magellan\Data\Geometries\Point;

class BeaconController extends Controller
{
    /**
     * Display a listing of the Beacon.
     * @lrd:start
     * Get an array of all beacons
     * @lrd:end
     */
    public function index()
    {
        // Gets all beacons from the database
        return response()->json(['data' => BeaconJsonResponse::collection(Beacon::all())], 200);
    }

    /**
     * Store a newly created Beacon in storage.
     * @lrd:start
     * Creates a new Beacon
     * - **host_id** : user_id of the user creating the beacon; user_id must exist
     * - **title** : title of the beacon event
     * - **game_title** : title of the game being played at the event
     * - **game_system** : such as PC, Nintendo Switch, Xbox, etc.
     * - **description** : information about the event
     * - **start_date_time** : when the event will start; example format = 12/12/23 1:00pm
     * - **end_date_time** : when the event will end; example format = 12/12/23 1:00pm
     * - **address** : street address of the event location
     * - **latitude** : GPS latitude of the address
     * - **longitude** : GPS longitude of the address
     * - **num_players** : number of players needed to start the event
     * @lrd:end
     */
    public function store(BeaconPostRequest $request)
    {
        // Modify JSON response to add a coordinates field for the database
        $beaconRequest = $request->all();
        $beaconRequest['coordinates'] = Point::makeGeodetic($request->latitude, $request->longitude); // create coordinates field as type geography
        unset($beaconRequest['latitude']); // remove latitude field
        unset($beaconRequest['longitude']); // remove longitude field

        // Insert new beacons into storage
        $beacon = Beacon::create($beaconRequest);

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
    public function show(string $beacon_id)
    {
        $beacon = Beacon::find($beacon_id);
        return response()->json(['data' => $beacon], 200);
    }

    /**
     * Update the specified Beacon in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified Beacon from storage.
     */
    public function destroy(string $beacon_id)
    {
        $beacon = Beacon::find($beacon_id);

        if (!$beacon) {
            return response()->json(['error' => 'Beacon not found'], 400);
        }
        if ($beacon->delete()) {
            return response()->json(['message' => 'Beacon deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Failed to delete beacon'], 500);
        }
    }
}
