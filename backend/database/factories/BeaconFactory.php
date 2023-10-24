<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
            'host_id' => null,
            'title' => fake()->sentence,
            'game' => [
                'game_title' => fake()->sentence,
                'game_image' => fake()->imageUrl
            ],
            'description' => fake()->sentence,
            'date_time' => fake()->dateTime->format('Y-m-d H:i:s'),
            'location' => [
                'description' => fake()->address,
                'latitude' => fake()->latitude,
                'longitude' => fake()->longitude
            ],
            'players_needed' => fake()->numberBetween(1, 100)
        ];
    }
}
