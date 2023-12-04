<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeaconController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AttendeeController;
use App\Http\Controllers\ProfileController;

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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('beacons', BeaconController::class);
    Route::apiResource('users', UserController::class)->except('store');
    Route::get('games', [GameController::class, 'getGames']);
    // Route::delete('beacons', 'BeaconController@delete');
});

Route::apiResource('attendees', AttendeeController::class);
Route::post('attendees', [App\Http\Controllers\AttendeeController::class, 'store']);

Route::apiResource('profiles', ProfileController::class);

Route::
