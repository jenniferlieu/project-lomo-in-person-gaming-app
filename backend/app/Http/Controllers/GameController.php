<?php

namespace App\Http\Controllers;

use MarcReichel\IGDBLaravel\Models\Game;
use MarcReichel\IGDBLaravel\Enums\Image\Size;

/**
 * Gets game information by game ID or name using IGDB's API.
 * The response has a JSON payload with a data field containing an array of games elements.
 *
 * For IGDB API documentation:
 * @see https://api-docs.igdb.com/
 *
 * For IGDB-Laravel package documentation:
 * @see https://github.com/marcreichel/igdb-laravel
 *
 */
class GameController extends Controller
{
    /**
     * @lrd:start
     * Gets game data by name using IGDB's API. Returned as an array of objects.
     * @lrd:end
     */
    public function getGamesByName(string $game_title)
    {
        // Search game title from IGDB
        $games = Game::search($game_title) // search function must be called first
            ->select(['name, cover']) // fields
            ->with(['cover' => ['image_id', 'url']]) // sub-fields
            ->get(); // make API call

        // Convert the thumbnail images into the largest size
        for ($i = 0; $i < count($games); $i++) {
            // get the game data
            $game = $games[$i]; // type Game::class

            // get the biggest cover image version
            if ($game->cover) {
                $game->cover->url = $game->cover->getUrl(Size::COVER_BIG);
            }
        }

        return response()->json(['data' => $games]);
    }
}
