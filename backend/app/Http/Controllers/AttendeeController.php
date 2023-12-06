<?php

namespace App\Http\Controllers;

use App\Models\Attendee;
use Illuminate\Http\Request;
use App\Http\Requests\AttendeePostRequest;
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
        return response()->json([
            'attendee' =>$attendee
        ], 201);
    }

    public function show(string $beacon_id) {
        $attendees = DB::table('attendees')->where('beacon_id', $beacon_id)->get();
        return response()->json(['attendees' => $attendees],200);
    }

    public function update() {
        
    }

    public function destroy(string $attendee_id) {
        $deleteAttendee = Attendee::find($attendee_id);
        if (!$deleteAttendee) {
            return response()-json(['error' => 'Attendee not found'],400);
        }
        if($deleteAttendee->delete()) {
            return response() ->json(['message' => 'Attendee deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Failed to delete attendee'],500);
        }
    }

    public function beaconAttendees(Request $request) {
        $beacon_id = $request->route('beacon_id');
        $attendees = DB::table('attendees')->where('beacon_id', $beacon_id)->get();
        $users = array();
        $usernames = array();
        foreach ($attendees as $user) {
            array_push($users,$user->user_id);
        }
        foreach ($users as $gamer) {
            $username = DB::table('users')->where('id', $gamer)->get();
            array_push($usernames,$username[0]->username);
        }
        return response()->json(['attendees' => $attendees],200);
    }
}
