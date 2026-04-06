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

        'timezone',
        'date_format',
        'currency',
        'maintenance_mode',
        'email_notifications',
        'analytics_enabled',
        'tracking_enabled',
        'data_retention_days',
        'cache_duration_minutes',
        'session_timeout_minutes',
        'max_upload_size_mb',

        // Audit columns
        'created_by',
        'updated_by',
        'deleted_by',

        'created_at',
        'updated_at',
        'deleted_at',
    ];
}
