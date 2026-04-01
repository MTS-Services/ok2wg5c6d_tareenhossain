<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'id',
        'website_name',
        'contact_email',
        'website_logo',
        'ga_tracking_id',
        'ga_connected',

        // Audit columns
        'created_by',
        'updated_by',
        'deleted_by',

        'created_at',
        'updated_at',
        'deleted_at',
    ];
}
