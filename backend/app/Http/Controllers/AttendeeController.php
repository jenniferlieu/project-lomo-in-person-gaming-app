<?php

namespace App\Http\Controllers;

use App\Models\Attendee;
use App\Events\AttendeeCreate;
use Illuminate\Http\Request;
use App\Http\Requests\AttendeePostRequest;
use App\Http\Requests\AttendeeUpdateRequest;
use App\Models\Beacon;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AttendeeController extends Controller
{
    public function index() {
        $attendee = new Attendee();
        $attendee = Attendee::all();
        return response()->json(['attendee' => $attendee->toArray(),200]);
        return response()->json(['message' => 'testing']);
    }

    public function store(AttendeePostRequest $request) {
        $attendee = new Attendee();
        $attendee->beacon_id = $request->beacon_id;
        if (!Beacon::find($attendee->beacon_id)) {
            return response()->json(['error' => 'Beacon not found'], 404);
        }
        $attendee->user_id = $request->user_id;
        if (!User::find($attendee->user_id)) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $attendee->controllers_brought = $request->controllers_brought;
        $attendee->save();
        event(new AttendeeCreate($attendee));
        return response()->json([
            'attendee' =>$attendee
        ], 201);
    }

    public function show(string $beacon_id) {
        $attendees = DB::table('attendees')->where('beacon_id', $beacon_id)->get();
        return response()->json(['attendees' => $attendees],200);
    }

    public function deleteAttendee(string $user_id, string $beacon_id)
{
    // Attempt to find specified attendee
    $deleteAttendee = Attendee::where(['beacon_id' => $beacon_id, 'user_id' => $user_id])->first();

    // Check if attendee exists
    if ($deleteAttendee) {
        // Delete attendee if exists
        $deleteAttendee->delete();
        return response()->json(['message' => 'Attendee deleted successfully', 'data' => $deleteAttendee], 200);
    } else {
        // Return error if attendee doesn't exist
        return response()->json(['error' => 'Failed to delete attendee', 'data' => $deleteAttendee], 500);
    }
}

public function updateAttendee(Request $request, string $user_id, string $beacon_id)
{
    $validatedData = $request->validate([
        'beacon_id' => 'nullable|string|exists:beacons,id',
        'user_id' => 'nullable|string|exists:users,id',
        'controllers_brought' => 'nullable|integer',
        'isHost' => 'nullable|bool'
    ]);

    // Attempt to find specified attendee
    $attendee = Attendee::where(['beacon_id' => $beacon_id, 'user_id' => $user_id])->first();
    if (!$attendee) {
        return response()->json(['error' => "Attendee doesn't exist"]);
    }

    // Update attendee if exists with new data
    $updated = $attendee->update($validatedData);
    // Check if update worked
    if ($updated) {
        return response()->json(['message' => "Attendee updated successfully", 'data' => $attendee],200);
    } else {
        // Return error if attendee doesn't exist
        return response()->json(['error' => 'Failed to update beacon', 'data' => $attendee], 500);
    }
}
}
