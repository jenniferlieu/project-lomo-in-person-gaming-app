<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeaconController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AttendeeController;
use App\Http\Controllers\ProfileController;
use App\Models\Attendee;

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
    Route::apiResource('attendees', AttendeeController::class);
    Route::get('attendees/beaconAttendees/{beacon_id}', [App\Http\Controllers\AttendeeController::class,'beaconAttendees']);
    Route::get('beacon-display-user-info', function () {
        event(new \App\Events\BeaconDisplayUserInfo());
    });
    Route::get('attendee-info', function (){
        event(new \App\Events\AttendeeInfo());
    });

});

Route::get('/profiles/{user_id}', [ProfileController::class, 'show']);

