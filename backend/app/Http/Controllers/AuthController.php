<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user in storage.
     */
    public function register(RegisterRequest $request)
    {
        $user = new User();
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        // inserts new user into database
        $user->save();

        return response()->json([
            'message' => 'User successfully created',
            'user' => $user
        ], 201);
    }

    /**
     * Checks if the resource has valid login credentials.
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        // verifies that the user exists and that password match in the database
        // then stores the user data in the session
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid email or password',
                'error' => 'Invalid email or password'
            ], 401);
        }

        // get user data that's stored in the session
        $user = Auth::user();

        // creates a personal access token for the user
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User successfully logged in',
            'token' => $token,
            'user' => $user
        ], 200);
    }
}
