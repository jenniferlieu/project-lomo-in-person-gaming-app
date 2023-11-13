<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), 
            'about_me' => $this->faker->text,
            'preferred_games' => $this->toPostgresArray(['Game 1', 'Game 2']), 
            'preference_tags' => $this->toPostgresArray(['Tag 1', 'Tag 2']), 
        ];
    }

    /**
     * Convert a PHP array to a PostgreSQL array string.
     */
    protected function toPostgresArray(array $array): string
    {
        return '{' . implode(',', array_map(function ($value) {
            return '"' . addslashes($value) . '"';
        }, $array)) . '}';
    }
}


