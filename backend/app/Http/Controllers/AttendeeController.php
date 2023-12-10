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

    public function deleteAttendee(Request $request) {
        $beacon_id = $request->beacon_id;
        $user_id = $request->user_id;
        $deleteAttendee = DB::table('attendees')->where(['beacon_id' => $beacon_id, 'user_id' => $user_id])->delete();
        if($deleteAttendee) {
            return response() ->json(['message' => 'Attendee deleted successfully',$deleteAttendee], 200);
        } else {
            return response()->json(['error' => 'Failed to delete attendee',$deleteAttendee],500);
        }
    }

    public function updateAttendee(Request $request) {
        $validatedData = $request->validate([
            'beacon_id' => 'required|string',
            'user_id' => 'required|string',
            'controllers_brought' => 'required|integer'
        ]);
        $beacon_id = $request->beacon_id;
        $user_id = $request->user_id;
        $attendee = Attendee::where(['beacon_id' => $beacon_id, 'user_id' => $user_id])->update(['beacon_id' => $request->beacon_id, 'user_id' => $request->user_id, 'controllers_brought' => $request->controllers_brought]);
        if ($attendee){
            return response()->json(['message' => "Attendee updated successfully", 'data' => $attendee]);
        } else {
            return reponse()->json(['error' => 'Failed to update beacon'],500);
        }

    }
}
