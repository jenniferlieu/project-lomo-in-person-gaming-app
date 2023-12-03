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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected $table = 'profiles';

    protected $fillable = [
        'user_id',
        'about_me',
        'preferred_games',
        'preference_tags',
    ];

    public function setPreferredGamesAttribute($value)
    {
        // Check if the input value is an array
        if (is_array($value)) {
            // Convert the array to a PostgreSQL array format
            $this->attributes['preferred_games'] = $this->toPostgresArray($value);
        }
    }
    
    public function setPreferenceTagsAttribute($value)
    {
        // Check if the input value is an array
        if (is_array($value)) {
            // Convert the array to a PostgreSQL array format
            $this->attributes['preference_tags'] = $this->toPostgresArray($value);
        }
    }
    
    public function getPreferredGamesAttribute($value)
    {
        // Convert the PostgreSQL array format back to a PHP array
        return $this->fromPostgresArray($value);
    }
    
    public function getPreferenceTagsAttribute($value)
    {
        // Convert the PostgreSQL array format back to a PHP array
        return $this->fromPostgresArray($value);
    }

    /**
     * Convert a PHP array to a PostgreSQL array string.
     */
    protected function toPostgresArray($array)
    {
        return '{' . implode(',', array_map(function ($value) {
            return '"' . addslashes($value) . '"';
        }, $array)) . '}';
    }

    /**
     * Convert a PostgreSQL array string to a PHP array.
     */
    protected function fromPostgresArray($string)
    {
        $string = trim($string, "{}");
        $array = explode(',', $string);
        return array_map(function ($value) {
            return stripslashes(trim($value, "\""));
        }, $array);
    }
}
