<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MarcReichel\IGDBLaravel\Models\Game;
use MarcReichel\IGDBLaravel\Builder as IGDB;

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
class GameController extends Controller {
    /**
     * @lrd:start
     * Gets game data by fuzzy name using IGDB's API. Returned as an array of objects.
     * @lrd:end
     */
    public function getGamesByFuzzyName(string $game_title) {
        $gamesJson = [];

        $games = Game::fuzzySearch(
            // fields to search in
            ['name'],
            // the query to search for
            $game_title,
            // enable/disable case sensitivity (disabled by default)
            false,
        )->select(['name', 'cover'])
            ->with(['cover'])
            ->get();

        // return only the cover url instead of the entire cover object
        $gamesSize = count($games);
        for($i = 0; $i < $gamesSize; $i++) {
            $game = (array)$games[$i]->attributes;
            if(isset($game['cover'])) {
                $artwork = $game['cover']['url'];
                unset($game['cover']);
                $game['url'] = $artwork;
                array_push($gamesJson, $game);
            } else {
                array_push($gamesJson, $game);
            }
        }

        return response()->json(['data' => $gamesJson]);
    }

    /**
     * @lrd:start
     * Gets game data by name using IGDB's API. Returned as an array of objects.
     * @lrd:end
     */
    public function getGamesByName(string $game_title) {
        $fields = 'name,cover.url';
        $igdb = new IGDB('games?fields='.$fields.'&search='.$game_title); // 'games' is the endpoint
        $games = $igdb->get();
        return response()->json(['data' => $games]);
    }
}
