<?php

namespace App\Services;

use App\Enums\DiscountType;
use App\Enums\ProductType;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected Product $model) {}

    public function getAll()
    {
        return $this->model->with('category')->latest()->get();
    }

    public function getBySlug($slug)
    {
        return $this->model
            ->where('slug', $slug)
            ->with('category')
            ->first();
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

    public function getCategories()
    {
        return Category::all();
    }

    public function createProduct(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'status' => 'required|boolean',
            'display_order' => 'nullable|integer|min:1',
        ]);

        $productData = [
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'category_id' => $validated['category_id'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'type' => ProductType::UPCOMING,
            'stock_level' => 0,
            'price' => 0,
            'discount' => 0,
            'discount_type' => DiscountType::PERCENTAGE,
            'created_by' => Auth::id(),
        ];

        $product = $this->model->create($productData);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->update(['image' => $imagePath]);
        }

        return $product;
    }

    public function updateProduct(Request $request, $slug)
    {
        $product = $this->getBySlug($slug);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'status' => 'required|boolean',
            'display_order' => 'nullable|integer|min:1',
        ]);

        $productData = [
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'category_id' => $validated['category_id'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'display_order' => $validated['display_order'] ?? $product->display_order,
            'updated_by' => Auth::id(),
        ];

        $product->update($productData);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->update(['image' => $imagePath]);
        }

        return $product;
    }

    public function deleteProduct($slug)
    {
        $product = $this->getBySlug($slug);
        $product->delete();
        return $product;
    }

    public function getFilters(Request $request)
    {
        return $request->only(['search', 'category_id', 'status']);
    }
}
