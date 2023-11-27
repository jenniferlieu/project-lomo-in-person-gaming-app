<?php

namespace App\Http\Controllers;

use App\Models\Attendee;
use Illuminate\Http\Request;
use App\Http\Requests\AttendeePostRequest;

class AttendeeController extends Controller
{
    public function index() {
        $attendee = new Attendee();
        $attendee = Attendee::all();
        return response()->json(['attendee' => $attendee->toArray(),200]);
    }

    public function store(AttendeePostRequest $request) {
        // $attendeeRequest = $request->all();
        // $attendee = Attendee::create($attendeeRequest);
        // $attendeeJson = new AttendeeJsonResponse($attendee);
        // event(new AttendeeCreate($attendeeJson));
        // return response()->json(['attendee' => $attendeeJson],200);
        $attendee = new Attendee();
        $attendee->beacon_id = $request->beacon_id;
        $attendee->user_id = $request->user_id;
        $attendee->save();
        return response()->json([
            'attendee' =>$attendee
        ], 201);
    }

    public function show(string $attendee_id) {
        $attendee = Attendee::find($attendee_id);
        return response()->json(['attendee' => $attendee], 200);
    }

    public function update() {

    }

    public function destroy() {

    }
}
