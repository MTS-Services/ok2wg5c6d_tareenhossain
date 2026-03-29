<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected Product $model) {}

    public function getAll()
    {
        return $this->model->all();
    }

    public function getBySlug($slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function getFilteredProducts(Request $request)
    {
        $query = $this->model->with('category');

        // Search by title
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status === '1');
        }

        return $query->orderBy('created_at', 'desc')->get(['id', 'title', 'slug', 'image', 'category_id']);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function updateBySlug($slug, array $data)
    {
        $product = $this->model->where('slug', $slug)->first();
        $product->update($data);
        return $product;
    }

    public function deleteBySlug($slug)
    {
        $product = $this->model->where('slug', $slug)->first();
        $product->delete();
        return $product;
    }
}
