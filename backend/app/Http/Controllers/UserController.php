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
        return response()->json(['data' => $user->toArray()], 200);
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
        return response()->json(['data' => $user -> toArray()], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {   //validation
        $validatedData = $request->validate([
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'username' => 'required|max:255',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255'
            //find user by user id
            $user = User::where('user_id', $id)->first();
            //if cannot find user, return error message
            if(!user){
                return response()->json(['error' => 'User not found'], 404);
            }
            $user -> fill($validatedData)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
    }
}
