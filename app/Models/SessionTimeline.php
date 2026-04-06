<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionTimeline extends Model
{
    protected $fillable = [
        'visitor_id',
        'event',
        'description',
        'event_time',
    ];

    protected $casts = [
        'event_time' => 'datetime',
    ];
}
