<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Beacon extends Model
{
    use HasFactory;

    // Format model to use uuid as primary key: Set uuid primary key to not increment
    public $incrementing = false;

    // Format model to use uuid as primary key: Set uuid primary key type to string instead of an integer
    protected $keyType = 'string';

    // Format model to use uuid as primary key: Automatically create a new uuid for primary key
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'host_id',
        'title',
        'game_title',
        'game_system',
        'description',
        'start_date_time',
        'end_date_time',
        'address',
        'coordinates',
        'num_players'
    ];

    protected $casts = [
        'start_date_time' => 'datetime',
        'end_date_time' => 'datetime',
    ];
}
