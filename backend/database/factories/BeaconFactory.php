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
            'game_title' => fake()->sentence,
            'game_system' => fake()->sentence,
            'description' => fake()->sentence,
            'start_date_time' => fake()->dateTime->format('Y-m-d H:i:s'),
            'end_date_time' => fake()->dateTime->format('Y-m-d H:i:s'),
            'address' => fake()->address,
            'latitude' => fake()->latitude,
            'longitude' => fake()->longitude,
            'players_needed' => fake()->numberBetween(0, 10)
        ];
    }
}
