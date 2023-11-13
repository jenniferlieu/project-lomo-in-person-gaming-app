<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Profile extends Model
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

    protected $table = 'profiles';

    protected $fillable = [
        'user_id',
        'about_me',
        'preferred_games',
        'preference_tags',
    ];

    protected $casts = [
        'preferred_games' => 'array',
        'preference_tags' => 'array',
    ];
}
