<?php

namespace App\Helpers;

use romanzipp\Twitch\Facades\Twitch;
use \Exception;

class GameHelper
{
    /**
     * Gets a single game data by name from Twitch.
     */
    public static function getGameByName(string $game_title): array
    {
        // Make API call to Twitch to Get game image url
        try {
            $result = Twitch::getGames(['name' => $game_title]);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        // Check if the query was successful
        if (!$result->success()) {
            throw new Exception($result->getErrorMessage());
        }

        // Shift result to get the first (and only) game data in array
        $gameData = $result->shift();
        if (!$gameData) {
            throw new Exception('Empty data. No such game exists.' . ' game_title: ' . $game_title);
        }

        // Convert stdClass object type to array
        $gameDataArray = json_decode(json_encode($gameData), true);

        // Add field for full sized image url
        $gameDataArray['box_art_url_full'] = str_replace("-{width}x{height}", "", $gameDataArray['box_art_url']);

        return $gameDataArray;
    }
}
