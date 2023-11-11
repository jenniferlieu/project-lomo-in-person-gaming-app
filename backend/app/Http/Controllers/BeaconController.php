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
        // Insert new beacons into storage
        $beacon = Beacon::create([
            'host_id' => $request->host_id,
            'title' => $request->title,
            'game_title' => $request->game_title,
            'game_system' => $request->game_system,
            'description' => $request->description,
            'start_date_time' => $request->start_date_time,
            'end_date_time' => $request->end_date_time,
            'address' => $request->address,
            'coordinates' => Point::makeGeodetic($request->latitude, $request->longitude),
            'num_players' => $request->num_players
        ]);

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
        //
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
    public function destroy(string $id)
    {
        //
    }
}
