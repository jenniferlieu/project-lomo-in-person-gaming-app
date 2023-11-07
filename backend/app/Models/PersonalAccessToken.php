<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
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
}
