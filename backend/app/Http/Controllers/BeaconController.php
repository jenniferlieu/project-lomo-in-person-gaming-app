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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        // TODO: uncomment when database is setup
//        // sets the Beacon object with information received from request.
//        $beacon = new Beacon;
//        $beacon->title = $request->title;
//
//        // save to database
//        $beacon->save()

        return response()->json([
            'result' => 'ok',
//            'data' => $beacon
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
