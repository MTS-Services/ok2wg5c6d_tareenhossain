<?php

namespace App\Models;

use App\Enums\DiscountType;
use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category_id',
        'description',
        'image',
        'status',
        'type',
        'stock_level',
        'price',
        'discount',
        'discount_type',

        // Audit columns
        'created_by',
        'updated_by',
        'deleted_by',

        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'type' => ProductType::class,
        'discount_type' => DiscountType::class,
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
