<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MarcReichel\IGDBLaravel\Models\Game;

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
     * Gets game data (name, cover, url) using IGDB's API. Returned as an array of objects.
     */
    public function getGamesByName(string $game_title) {
        // $game_title = ucwords($game_title);
        // $games = Game::where('name', $game_title)
        //     ->select(['name', 'cover'])
        //     ->with(['cover'])
        //     ->get();
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
            $artwork = $game['cover']['url'];
            unset($game['cover']);
            $game['url'] = $artwork;
            array_push($gamesJson, $game);
        }

        return response()->json(['data' => $gamesJson]);
    }
}
