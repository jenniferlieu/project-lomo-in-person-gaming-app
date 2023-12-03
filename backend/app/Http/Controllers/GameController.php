<?php

namespace App\Http\Controllers;

use romanzipp\Twitch\Twitch;
use Exception;
use Illuminate\Http\Request;

/**
 * Gets game information by game ID or name using Twitch's API.
 * The response has a JSON payload with a data field containing an array of games elements.
 *
 * For Twitch API documentation:
 * @see https://dev.twitch.tv/docs/api/reference#get-games
 *
 * For Laravel-Twitch package documentation:
 * @see https://github.com/romanzipp/Laravel-Twitch
 * NOTE: NEVER EVER PUBLISH THE LARAVEL-TWITCH CONFIG!
 *
 */
class GameController extends Controller
{
    /**
     * @lrd:start
     * Gets game name and image url using Twitch's API.
     *
     * At least one of these parameters required.
     *
     * For Twitch API documentation: https://dev.twitch.tv/docs/api/reference#get-games
     * - **id** = twitch's game id e.g: ?id=509538
     * - **name** = title of the game e.g: ?name=animal crossing: new horizons
     * - **igdb_id** = igdb's game id e.g: ?igdb_id=109462
     * @lrd:start
     *
     * @LRDparam id string|nullable
     * @LRDparam name string|nullable
     * @LRDparam igdb_id string|nullable
     */
    // public function getGameImageURL(?string $id = null, ?string $name = null, ?string $igdb_id = null)
    public function getGame(Request $request)
    {
        // Create a Twitch instance
        $twitch = new Twitch;

        // Make API call to Twitch to Get game image url
        try {
            $result = $twitch->getGames([
                'id' => $request->input('id'),
                'name' => $request->input('name'),
                'igdb_id' => $request->input('igdb_id'),
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        // Check if the query was successful
        if (!$result->success()) {
            return response()->json(['message' => $result->getErrorMessage()], 400);
        }

        // Shift result to get the first (and only) game data in array
        $gameData = $result->shift();

        // Get the full sized image url
        // remove the optional width and height substring in image url
        $gameImageURLFull = str_replace("-{width}x{height}", "", $gameData->box_art_url);
        $gameData->box_art_url_full = $gameImageURLFull;

        // Return game image url
        return response()->json(['data' => $gameData]);
    }
}
