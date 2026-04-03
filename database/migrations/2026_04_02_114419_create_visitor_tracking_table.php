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
        Schema::create('visitor_trackings', function (Blueprint $table) {
        $table->id();
        $table->string('visitor_id')->unique(); // VIS-001
        $table->string('ip_address')->nullable();
        $table->string('country')->nullable();
        $table->string('city')->nullable();
        $table->string('device')->nullable();       // Desktop/Mobile/Tablet
        $table->string('browser')->nullable();
        $table->string('page_visited')->nullable(); // /products
        $table->string('product_clicked')->nullable();
        $table->integer('duration')->default(0);    // seconds
        $table->timestamp('visit_time')->nullable();
        $table->timestamps();
    });

    Schema::create('session_timelines', function (Blueprint $table) {
        $table->id();
        $table->string('visitor_id');
        $table->string('event');        // "Entered Website"
        $table->string('description')->nullable();
        $table->timestamp('event_time');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitor_trackings');
        Schema::dropIfExists('session_timelines');
    }
};
