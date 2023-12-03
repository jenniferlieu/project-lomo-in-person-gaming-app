<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Beacon;

class BeaconJsonResponse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'host_id' => $this->host_id,
            'game_title' => $this->game_title,
            'game_image' => $this->game_image,
            'console' => $this->console,
            'description' => $this->description,
            'start_date_time' => $this->start_date_time,
            'end_date_time' => $this->end_date_time,
            'place_name' => $this->place_name,
            'street_address' => $this->street_address,
            'latitude' => $this->coordinates->getLatitude(),
            'longitude' => $this->coordinates->getLongitude(),
            'players_wanted' => $this->players_wanted,
            'controllers_wanted' => $this->controllers_wanted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
