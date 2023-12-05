<?php

namespace App\Http\Controllers;


use Exception;
use Illuminate\Http\Request;

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
     * Gets game data using IGDB's API. Returned as an array of objects.
     */
    public function getGames(Request $request) {

    }
}
