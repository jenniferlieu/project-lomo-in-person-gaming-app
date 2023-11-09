<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // gets all users from the database
        $user = User::all();
        return response()->json(['data' => $user], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // gets user data from database by user_id
        $user = User::find($id);
        // check if user exist
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        // Return only the user information from the users table
        return response()->json(['data' => ['id' => $user->id,'email' => $user->email,'username' => $user->username]], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {   
        // Validate the request data
        $validatedData = $request->validate([
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'username' => 'required|max:255'
        ]);
        $user = User::find($id);
        // check if user exist
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        // fill the user data
        $user->fill($validatedData);
        
        // Save the user data
        if (!$user->save()) {
        return response()->json(['message' => 'User updated successfully', 'data' => $user], 200);
        } else {
        return response()->json(['error' => 'Failed to update user'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

    }
}
