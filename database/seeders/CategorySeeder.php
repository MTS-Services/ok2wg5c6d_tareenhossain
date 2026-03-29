<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Category::insert([
    [
        'id' => 1,
        'title' => 'Electronics',
        'slug' => 'electronics',
        'status' => 'active',
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'id' => 2,
        'title' => 'Furniture',
        'slug' => 'furniture',
        'status' => 'active',
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'id' => 3,
        'title' => 'Footwear',
        'slug' => 'footwear',
        'status' => 'active',
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'id' => 4,
        'title' => 'Lifestyle',
        'slug' => 'lifestyle',
        'status' => 'active',
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'id' => 5,
        'title' => 'Home',
        'slug' => 'home',
        'status' => 'active',
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ]
]);
    }
}
