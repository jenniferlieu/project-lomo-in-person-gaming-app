<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beacon;

class BeaconController extends Controller
{
    /**
     * Display a listing of the Beacon.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created Beacon in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        // If validation fails, Laravel will automatically return the errors as JSON with a 422 Unprocessable Entity status code
        $request->validate([
            'host_id' => 'required',
            'title' => 'required|string|max:255',
        ]);

        // Insert new beacon into the database
        // code here

        // Returns data on the new beacon created and a success status code
        return response()->json(['data' => $request->all()], 201); // 201 Request fulfilled and new resource created
    }

    /**
     * Display the specified Beacon.
     */
    public function show(string $id)
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
