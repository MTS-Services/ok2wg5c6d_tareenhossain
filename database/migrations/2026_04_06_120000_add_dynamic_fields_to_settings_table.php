<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('timezone')->default('UTC')->after('ga_connected');
            $table->string('date_format')->default('Y-m-d')->after('timezone');
            $table->string('currency')->default('USD')->after('date_format');

            $table->boolean('maintenance_mode')->default(false)->after('currency');
            $table->boolean('email_notifications')->default(true)->after('maintenance_mode');

            $table->boolean('analytics_enabled')->default(true)->after('email_notifications');
            $table->boolean('tracking_enabled')->default(true)->after('analytics_enabled');

            $table->unsignedInteger('data_retention_days')->default(30)->after('tracking_enabled');

            $table->unsignedInteger('cache_duration_minutes')->default(60)->after('data_retention_days');
            $table->unsignedInteger('session_timeout_minutes')->default(30)->after('cache_duration_minutes');
            $table->unsignedInteger('max_upload_size_mb')->default(10)->after('session_timeout_minutes');
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};

