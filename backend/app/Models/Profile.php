<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

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
