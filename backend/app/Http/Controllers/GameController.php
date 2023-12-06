<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MarcReichel\IGDBLaravel\Models\Game;
use MarcReichel\IGDBLaravel\Builder as IGDB;
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
class GameController extends Controller {
    /**
     * @lrd:start
     * Gets game data by fuzzy name using IGDB's API. Returned as an array of objects.
     * @lrd:end
     */
    public function getGamesByFuzzyName(string $game_title) {
        $gamesArray = [];

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
        for($i = 0; $i < count($games); $i++) {
            $game = $games[$i];
            $gameData = $game->attributes;

            if($game->cover) {
                $cover_url = $game->cover->getUrl(Size::COVER_BIG);
                $cover_id = $game->cover->id;
                unset($gameData['cover']);
                $gameData['cover']['id'] = $cover_id;
                $gameData['cover']['url'] = $cover_url;
            }
            array_push($gamesArray, $gameData);
        }

        return response()->json(['data' => $gamesArray]);
    }

    /**
     * @lrd:start
     * Gets game data by name using IGDB's API. Returned as an array of objects.
     * @lrd:end
     */
    public function getGamesByName(string $game_title) {
        $gamesArray = [];
        $fields = 'name,cover.image_id,cover.url';

        $igdb = new IGDB('games?fields='.$fields.'&search='.$game_title); // 'games' is the endpoint
        $games = $igdb->get();

        for($i = 0; $i < count($games); $i++) {
            // get the game data
            $game = new Game($games[$i]);
            $gameData = $game->attributes;

            // get the biggest cover image version
            if($game->cover) {
                $cover = $game->cover->getUrl(Size::COVER_BIG);
                $gameData = $game->attributes;
                unset($gameData['cover']['image_id']);
                $gameData['cover']['url'] = $cover;
            }
            array_push($gamesArray, $gameData);
        }

        return response()->json(['data' => $gamesArray]);
    }
}
