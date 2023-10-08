<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beacon;

class BeaconController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $data = $request->validate([
            'host_id' => 'required',
            'title' => 'required|string|max:255',
            'image' => 'nullable',
            'game' => 'nullable',
            'description' => 'nullable',
            'date_time' => 'nullable',
            'location' => 'nullable',
            'num_players_needed' => 'nullable',
            'waitlist' => 'nullable',
            'players_attended' => 'nullable',
            'comments' => 'nullable',
        ]);

        // TODO: uncomment when database is setup
//        // sets the Beacon object with information received from request.
//        $beacon = new Beacon;
//        $beacon->host_id = $request->host_id;
//        $beacon->title = $request->title;
//        $beacon->image = $request->image;
//        $beacon->game = $request->game;
//        $beacon->description = $request->description;
//        $beacon->date_time = $request->date_time;
//        $beacon->location = $request->location;
//        $beacon->num_players_needed = $request->num_players_needed;
//        $beacon->waitlist = $request->waitlist;
//        $beacon->players_attended = $request->players_attended;
//        $beacon->comments = $request->comments;
//
//        // save to database
//        $beacon->save()

        return response()->json([
//            'data' => $beacon,
            'data' => $data
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
