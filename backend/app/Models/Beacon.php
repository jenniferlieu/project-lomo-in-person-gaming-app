<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Beacon extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'host_id',
        'title',
        'game_title',
        'game_image',
        'description',
        'date_time',
        'address',
        'latitude',
        'longitude',
        'players_needed'
    ];

    protected $casts = [
        'date_time' => 'datetime'
    ];
}
