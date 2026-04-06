<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyAnalytics extends Model
{
    protected $fillable = [
        'date',
        'visitors',
        'clicks',
        'unique_visitors',
    ];

    protected $casts = [
        'date' => 'date',
        'visitors' => 'integer',
        'clicks' => 'integer',
        'unique_visitors' => 'integer',
    ];
}
