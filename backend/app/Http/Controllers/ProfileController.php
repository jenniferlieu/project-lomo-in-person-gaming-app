<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function index()
    {
        // Retrieve all profiles from the database
        $profiles = Profile::all();
        // Return the profiles in a JSON response
        return response()->json(['data' => $profiles], 200);
    }

    public function show($userId)
    {
        // Find the profile by user ID
        $profile = Profile::find($userId);
        // Check if the profile exists
        if (!$profile) {
            return response()->json(['error' => 'Profile not found'], 404);
        }
        // Return the profile data in a JSON response
        return response()->json(['data' => $profile], 200);
    }

    public function update(Request $request, $userId)
    {
        // Find the profile by user ID
        $profile = Profile::find($userId);
        // Check if the profile exists
        if (!$profile) {
            return response()->json(['error' => 'Profile not found'], 404);
        }
        // Validate the request data
        $validatedData = $request->validate([
            'about_me' => 'string|nullable',
            'preferred_games' => 'array|nullable',
            'preference_tags' => 'array|nullable',
        ]);
        // Update the profile with the validated data
        $profile->update($validatedData);
        // Return a success message and the updated profile data in a JSON response
        return response()->json(['message' => 'Profile updated successfully', 'data' => $profile], 200);
    }

    public function destroy($userId)
    {
        // Find the profile by user ID
        $profile = Profile::find($userId);
        $profile->delete();
        return response()->json(['message' => 'Profile deleted successfully'], 200);
    }

    public function store(string $id)
    {
        //todo
    }
}
