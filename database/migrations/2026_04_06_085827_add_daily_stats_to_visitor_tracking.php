<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('visitor_trackings', function (Blueprint $table) {
            // Query helpers for analytics + tracking screens
            $table->index('created_at');
            $table->index('visit_time');
            $table->index('device');
            $table->index('country');
        });

        Schema::table('session_timelines', function (Blueprint $table) {
            $table->index(['visitor_id', 'event_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitor_trackings', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['visit_time']);
            $table->dropIndex(['device']);
            $table->dropIndex(['country']);
        });

        Schema::table('session_timelines', function (Blueprint $table) {
            $table->dropIndex(['visitor_id', 'event_time']);
        });
    }
};
