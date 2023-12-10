<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeaconController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AttendeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleApiController;

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
    Route::apiResource('attendees', AttendeeController::class)->except(['destroy','update']);
    Route::patch('attendees/{user_id}/beacon/{beacon_id}', [AttendeeController::class, 'updateAttendee']);
    Route::delete('attendees/{user_id}/beacon/{beacon_id}', [AttendeeController::class, 'deleteAttendee']);
    Route::get('beacon-display-user-info', function () {
        event(new \App\Events\BeaconDisplayUserInfo());
    });
    Route::get('games/{game_title}', [GameController::class, 'getGamesByName']);

    Route::get('beacons/{beacon}/comments', [CommentController::class, 'index']);
    Route::post('beacons/{beacon}/comments', [CommentController::class, 'store']);
    // Route::get('attendee-info', function (){
    //     event(new \App\Events\AttendeeInfo());
    // });
    Route::delete('beacons/{beacon}/comments/{comment}', [CommentController::class, 'destroy']);

    Route::get('/profiles/{user_id}', [ProfileController::class, 'show']);
    Route::put('/profiles/{user_id}', [ProfileController::class, 'update']);
    Route::delete('/profiles/{user_id}', [ProfileController::class, 'destroy']);
    Route::post('/profiles', [ProfileController::class, 'store']);
    Route::get('/profiles', [ProfileController::class, 'index']);
    Route::post('/Googles', [GoogleApiController::class, 'googleApiRequest']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


