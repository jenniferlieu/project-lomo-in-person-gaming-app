<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Beacon;
use Illuminate\Http\Request;
use App\Events\CommentCreated;
use App\Events\CommentDeleted;

class CommentController extends Controller
{
    // Retrieve comments for a specific beacon
    public function index($beaconId)
    {
        $comments = Comment::where('beacon_id', $beaconId)->with('user')->get();
        return response()->json($comments);
    }

    public function store(Request $request, $beaconId)
    {
        $request->validate([
            
            'content' => 'required|string',

        ]);

        $comment = new Comment();
        $comment->user_id = auth()->id();
        $comment->beacon_id = $beaconId;
        $comment->content = $request->content;
        $comment->save();

        // Broadcast the event
        broadcast(new CommentCreated($comment))->toOthers();

        return response()->json($comment, 201);
    }

    public function destroy($beaconId, $commentId)
    {
        $comment = Comment::where('id', $commentId)->where('beacon_id', $beaconId)->first();

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        if ($comment->delete()) {
            broadcast(new CommentDeleted($commentId, $beaconId));
            return response()->json(['message' => 'Comment deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to delete comment'], 500);
        }
    }
}

