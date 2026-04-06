<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorTracking extends Model
{
    protected $fillable = [
        'visitor_id',
        'ip_address',
        'country',
        'city',
        'device',
        'browser',
        'page_visited',
        'product_clicked',
        'duration',
        'visit_time',
    ];

    protected $casts = [
        'duration' => 'integer',
        'visit_time' => 'datetime',
    ];

    public function timelines()
    {
        return $this->hasMany(SessionTimeline::class, 'visitor_id', 'visitor_id');
    }
}
