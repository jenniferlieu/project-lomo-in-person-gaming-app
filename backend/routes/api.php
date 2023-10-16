<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\BeaconController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::resource('posts', Controller::class)->only([
    'destroy', 'show', 'store', 'update'
 ]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// create a public user route to test database for login and signup
// delete after authentication has been setup
Route::resource('users', UserController::class, [
    'except' => ['edit', 'create']
]);

Route::resource('beacons', BeaconController::class, [
    'except' => ['edit', 'create']
]);

Route::get('/hello', function() {
    return response()->json(['message' => 'hello world']);
});

Route::post('register', [UserController::class, 'store']);

Route::post('login', [UserController::class, 'login']);