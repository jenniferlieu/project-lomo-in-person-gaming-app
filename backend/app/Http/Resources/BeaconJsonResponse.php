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
            "id" => $this->id,
            'host_id' => $this->host_id,
            'title' => $this->title,
            'game_title' => $this->game_title,
            'game_system' => $this->game_system,
            'description' => $this->description,
            'start_date_time' => $this->start_date_time,
            'end_date_time' => $this->end_date_time,
            'address' => $this->address,
            'latitude' => $this->coordinates->getLatitude(),
            'longitude' => $this->coordinates->getLongitude(),
            'num_players' => $this->num_players,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
