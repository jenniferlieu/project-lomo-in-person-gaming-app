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
        'game',
        'game.game_title',
        'game.game_image',
        'description',
        'date_time',
        'location',
        'location.description',
        'location.latitude',
        'location.longitude',
        'players_needed'
    ];

    /**
     * The attributes that are protected against mass assignment using the create and update methods.
     * They can be individually assigned outside those methods.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'players_attending',
        'players_attending.*.user_id',
        'comments',
        'comments.*.comment_id',
        'comments.*.beacon_id',
        'comments.*.user_id',
        'comments.*.body',
        'comments.*.timestamp'
    ];

    protected $casts = [
        'date_time' => 'datetime'
    ];
}
