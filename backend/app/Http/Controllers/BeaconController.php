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

class BeaconController extends Controller
{
    /**
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
     * @lrd:start
     * Creates a new Beacon and automatically adds the host to the attendees table
     * @lrd:end
     */
    public function store(BeaconPostRequest $request)
    {
        // Modify JSON request to fit in the database
        $beaconRequest = BeaconController::createCoordinatesField($request->all());

        // Insert new beacons into storage
        $beacon = Beacon::create($beaconRequest);

        // Add host as the first attendee
        $attendee = Attendee::create([
            'beacon_id' => $beacon->id,
            'user_id' => $beacon->host_id,
            'controllers_brought' => $beaconRequest['controllers_brought'],
        ]);

        // Transform JSON returned from database into the same JSON format request received
        // Remove coordinates field and replace it with latitude and longitude
        $beaconJson = new BeaconJsonResponse($beacon);

        // Push new beacon data through websocket to all users
        event(new BeaconCreated($beaconJson));

        // Returns data on the new beacon created and a success status code
        return response()->json(['data' => ['beacon' => $beaconJson, 'attendee' => $attendee]], 201); // 201 Request fulfilled and new resource created
    }

    /**
     * Display the specified Beacon.
     */
    public function show(string $beacon_id)
    {
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
    public function update(BeaconUpdateRequest $request, string $beacon_id)
    {
        $beacon = Beacon::find($beacon_id);
        if (!$beacon) {
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
        if ($beacon->save()) {
            return response()->json(['message' => "Beacon updated successfully", 'data' => $beacon], 200);
        } else {
            return response()->json(['error' => 'Failed to update beacon'], 500);
        }
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

    /**
     * Combine the latitude and longitude fields into a single coordinates field
     * for the database.
     */
    protected function createCoordinatesField(array $beaconArray): array
    {
        $beaconArray['coordinates'] = Point::makeGeodetic($beaconArray['latitude'], $beaconArray['longitude']);
        unset($beaconArray['latitude']); // remove latitude field
        unset($beaconArray['longitude']); // remove longitude field
        return $beaconArray;
    }
}
