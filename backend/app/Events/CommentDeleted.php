<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CommentDeleted implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $commentId;
    public $beaconId;

    public function __construct($commentId, $beaconId)
    {
        $this->commentId = $commentId;
        $this->beaconId = $beaconId;
    }

    public function broadcastOn()
    {
        return new Channel('beacon.' . $this->beaconId);
    }
}
