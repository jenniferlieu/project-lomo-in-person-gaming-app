<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Clickbar\Magellan\Data\Geometries\Point;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Beacon>
 */
class BeaconFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'host_id' => fake()->randomElement(User::pluck('id')),
            'game_title' => "Fortnite",
            'game_image' => fake()->imageUrl(640, 480, 'animals', true),
            'console' => fake()->sentence,
            'description' => fake()->sentence,
            'start_date_time' => fake()->dateTime->format('Y-m-d H:i:s'),
            'end_date_time' => fake()->dateTime->format('Y-m-d H:i:s'),
            'place_name' => fake()->sentence,
            'street_address' => fake()->address,
            'coordinates' => Point::makeGeodetic(fake()->latitude, fake()->longitude()),
            'players_wanted' => fake()->numberBetween(0, 10),
            'controllers_wanted' => fake()->numberBetween(0, 10),
        ];
    }
}
