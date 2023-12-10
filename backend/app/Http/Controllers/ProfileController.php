<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    /**
     * Retrieve all profiles from the database.
     *
     * @return \Illuminate\Http\JsonResponse
     * @lrd:start
     * Get an array of all profiles.
     * @lrd:end
     */
    public function index()
    {
        // Retrieve all profiles from the database
        $profiles = Profile::all();
        // Return the profiles in a JSON response
        return response()->json(['data' => $profiles], 200);
    }

    /**
     * Find and display the profile by user ID.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($userId)
    {
        // Find the profile by user ID
        $profile = Profile::where('user_id', $userId)->first();
        // Check if the profile exists
        if (!$profile) {
            return response()->json(['error' => 'Profile not found'], 404);
        }
        // Return the profile data in a JSON response
        return response()->json(['data' => $profile], 200);
    }

    /**
     * Update the profile with the specified user ID.
     *
     * @param  Request  $request
     * @param  int  $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $userId)
    {
        // Find the profile by user ID
        $profile = Profile::where('user_id', $userId)->first();
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

    /**
     * Delete the profile with the specified user ID.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($userId)
    {
        // Find the profile by user ID
        $profile = Profile::where('user_id', $userId)->first();
            // return an error response if not found
            if (!$profile) {
                return response()->json(['error' => 'Profile not found'], 404);
            }
        $profile->delete();
        // show successful message
        return response()->json(['message' => 'Profile deleted successfully'], 200);
    }

    /**
     * Create a new profile with the specified user ID.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|uuid',
            'about_me' => 'string|nullable',
            'preferred_games' => 'array|nullable',
            'preference_tags' => 'array|nullable',
        ]);
        // Create a new profile with the validated data
        $profile = Profile::create($validatedData);
        // Return a success message and the profile data
        return response()->json(['message' => 'Profile created successfully', 'data' => $profile], 201);
    }

}
