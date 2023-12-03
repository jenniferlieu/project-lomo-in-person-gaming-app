<?php

namespace App\Http\Controllers;


use Exception;
use Illuminate\Http\Request;
use romanzipp\Twitch\Facades\Twitch;

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
     * Gets game data using Twitch's API. Returned as an array of objects.
     * - At least one of these parameters required.
     * - To retrieve multiple games, separate same parameters with commas.
     * -
     *
     * - **id** = twitch's game id e.g: ?id=509538,33214
     * - **name** = title of the game e.g: ?name=animal crossing: new horizons,fortnite
     * - **igdb_id** = igdb's game id e.g: ?igdb_id=109462,1905
     *
     * For Twitch API documentation: https://dev.twitch.tv/docs/api/reference#get-games
     * @lrd:start
     *
     * @LRDparam id string|nullable
     * @LRDparam name string|nullable
     * @LRDparam igdb_id string|nullable
     */
    // public function getGameImageURL(?string $id = null, ?string $name = null, ?string $igdb_id = null)
    public function getGames(Request $request)
    {
        $ids = explode(',', $request->query('name'));
        $names = explode(',', $request->query('name'));
        $igdb_ids = explode(',', $request->query('name'));

        // Make API call to Twitch to Get game image url
        try {
            $result = Twitch::getGames([
                'id' => $ids,
                'name' => $names,
                'igdb_id' => $igdb_ids,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        // Check if the query was successful
        if (!$result->success()) {
            return response()->json(['message' => $result->getErrorMessage()], 400);
        }

        // Shift result to get the first (and only) game data in array
        $gameData = (array) $result->data();
        if (!$gameData) {
            return response()->json(['error' => 'Empty data. No such game exists.']);
        }

        // Add full-sized image url
        $gameData = json_decode(json_encode($gameData), true); // convert stdClass object to array
        for ($i = 0; $i < count($gameData); $i++) {
            if (array_key_exists('box_art_url', $gameData[$i])) {
                $gameData[$i]['box_art_url_full'] = str_replace('-{width}x{height}', '', $gameData[$i]['box_art_url']);
            }
        }

        return response()->json(['data' => $gameData]);
    }
}
