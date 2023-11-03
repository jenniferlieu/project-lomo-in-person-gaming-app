<?php

namespace App\Http\Controllers;

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
            'game' => $request->game,
            'description' => $request->description,
            'date_time' => $request->date_time,
            'location' => $request->location,
            'players_needed' => $request->players_needed
        ];

        // Insert new beacon into the database
        $beacon = new Beacon();
        $beacon->fill($data);
        $beacon->players_attending = [];
        $beacon->comments = [];

        $beacon->save();

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
