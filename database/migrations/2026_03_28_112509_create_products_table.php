<?php

use App\Enums\ProductType;
use App\Traits\AuditColumnsTrait;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use AuditColumnsTrait;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('category_id');
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('status');
            $table->string('type')->default(ProductType::UPCOMING->value);

            $table->integer('stock_level')->nullable();
            $table->decimal('price', 15, 2)->nullable();
            $table->decimal('discount', 15, 2)->nullable();
            $table->string('discount_type')->nullable();


             $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->timestamps();
            $this->addAdminAuditColumns($table);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
