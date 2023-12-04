<?php

namespace App\Http\Controllers;

use App\Events\BeaconCreated;
use App\Http\Requests\BeaconPostRequest;
use App\Http\Resources\BeaconJsonResponse;
use App\Http\Requests\BeaconUpdateRequest;
use Illuminate\Http\Request;
use App\Models\Beacon;
use Clickbar\Magellan\Data\Geometries\Point;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class BeaconController extends Controller
{
    /**
     * Display a listing of the Beacon.
     */
    public function index()
    {
        // Gets all beacons from the database
        $beacon = new Beacon();
        $beacon = Beacon::all();
        return response()->json(['beacon' => $beacon->toArray()], 200);
    }

    /**
     * Store a newly created Beacon in storage.
     */
    public function store(BeaconPostRequest $request)
    {
        // Modify JSON response to add a coordinates field for the database
        $beaconRequest = $request->all();
        $beaconRequest['coordinates'] = Point::makeGeodetic($request->latitude, $request->longitude); // create coordinates field as type geography with latitude and longitude points
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
        return response()->json(['beacon' => $beaconJson], 201); // 201 Request fulfilled and new resource created
    }

    /**
     * Display the specified Beacon.
     */
    public function show(string $beacon_id)
    {
        $beaconInfo = array();
        $beacon = Beacon::find($beacon_id);
        array_push($beaconInfo,$beacon);
        $attendees = DB::table('attendees')->where('beacon_id', $beacon_id)->get();
        $users = array();
        $attendeeTable = DB::table('attendees')->where('beacon_id',$beacon_id)->get(['user_id','controllers_brought']);
        array_push($beaconInfo,response()->json(['attendees' => $attendeeTable], 200)->getData());
        return response()->json(['data' => $beaconInfo], 200);
    }

    /**
     * Update the specified Beacon in storage.
     */
    public function update(BeaconUpdateRequest $request, string $beacon_id)
    {
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
        if ($beacon->save()) {
            return response()->json(['message' => "Beacon updated successfully", 'data' => $beacon],200);
        } else {
            return response()->json(['error' => 'Failed to update beacon'],500);
        }
    }

    /**
     * Remove the specified Beacon from storage.
     */
    public function destroy(string $beacon_id)
    {
        $beacon = Beacon::find($beacon_id);
        
        if (!$beacon) {
            return response()-json(['error' => 'Beacon not found'],400);
        }
        if($beacon->delete()) {
            return response() ->json(['message' => 'Beacon deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Failed to delete beacon'],500);
        }
    }
}
