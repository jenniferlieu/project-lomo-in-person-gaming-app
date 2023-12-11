<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Attendee extends Model
{
    use HasFactory;
     // Format model to use uuid as primary key: Set uuid primary key to not increment
     public $incrementing = false;

     public $timestamps = false;
     // Format model to use uuid as primary key: Set uuid primary key type to string instead of an integer
     protected $keyType = 'string';
 
     // Format model to use uuid as primary key: Automatically create a new uuid for primary key
     public static function boot(){
         parent::boot();
 
         static::creating(function ($model) {
             $model->id = Str::uuid();
         });
     }
     
    ### uuid go into user and copy public incremint gtilll end of boot
    ### in filliable add table fields but not id 
    protected $fillable = [
        'beacon_id',
        'user_id',
        'controllers_brought'
    ];

    protected $guarded = [
        'isHost'
    ];
}
