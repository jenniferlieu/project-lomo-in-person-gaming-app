<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Attendee;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
// Broadcast::channel('Beacon.{beacon_id}', function (Attendee $user_id, Attendee $beacon_id) {
//     return $user_id->$user_id === Attendee::findOrNew($beacon_id)->user_id;
// });
