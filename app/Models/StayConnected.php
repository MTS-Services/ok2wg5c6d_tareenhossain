<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StayConnected extends Model
{

    
    protected $fillable = [
        'id',
        'product_id',
        'number',
        'agree',


        'created_at',
        'updated_at',
        'creater_id',
        'creater_type',
        'updater_id',
        'updater_type',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
