<?php

namespace App\Helpers;

use Clickbar\Magellan\Data\Geometries\Point;
use \Exception;

class BeaconHelper
{
    /**
     * Modify json request receieved to match the database fields.
     * Fills in game_image field and combines latitude and longitude fields into the coordinates field.
     */
    public static function fillBeaconRequest(array $beaconArray): array
    {
        $modifiedArray = $beaconArray;

        // fill game_image and game_title fields
        if ($beaconArray['game_title']) {
            try {
                $gameData = GameHelper::getGameByName($beaconArray['game_title']);
            } catch (Exception $e) {
                throw new Exception($e->getMessage());
            }
            $modifiedArray['game_image'] = $gameData['box_art_url_full'];
            $modifiedArray['game_title'] = $gameData['name'];
        }

        // fill coordinates field and remove latitude and longitude
        if ($beaconArray['latitude'] && $beaconArray['longitude']) {
            $modifiedArray['coordinates'] = Point::makeGeodetic($beaconArray['latitude'], $beaconArray['longitude']);
            unset($beaconArray['latitude']); // remove latitude field
            unset($beaconArray['longitude']); // remove longitude field
        }

        return $modifiedArray;
    }
}
