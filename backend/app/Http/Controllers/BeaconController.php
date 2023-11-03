<?php

namespace App\Http\Controllers;

use App\Events\BeaconCreated;
use Illuminate\Http\Request;
use App\Models\Beacon;
use MongoDB\BSON\ObjectId;
use App\Http\Requests\BeaconRequest;

class BeaconController extends Controller
{
    /**
     * Display a listing of the Beacon.
     */
    public function index()
    {
        // gets all beacons from the database
        $beacon = new Beacon();
        $beacon = Beacon::all();
        return response()->json(['data' => $beacon->toArray()], 200);
    }

    /**
     * Store a newly created Beacon in storage.
     */
    public function store(BeaconRequest $request)
    {
        // get variables from json request
        $data = [
            'host_id' => new ObjectId($request->host_id),
            'title' => $request->title,
            'game_title' => $request->game_title,
            'game_system' => $request->game_system,
            'description' => $request->description,
            'start_date_time' => $request->start_date_time,
            'end_date_time' => $request->end_date_time,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'num_players' => $request->num_players
        ];

        // Insert new beacon into the database
        $beacon = new Beacon();
        $beacon->fill($data);

        $beacon->save();

        // Push new beacon data through websocket to all users
        event(new BeaconCreated($beacon));

        // Returns data on the new beacon created and a success status code
        return response()->json(['data' => $beacon], 201); // 201 Request fulfilled and new resource created
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
    public function destroy(string $id)
    {
        //
    }
}
