<?php

namespace App\Http\Controllers\Backend\ProductManagement;

use App\Http\Controllers\Controller;
use App\Enums\DiscountType;
use App\Enums\ProductType;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

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

        $products = $query->orderBy('created_at', 'desc')->get(['id', 'title', 'slug', 'image', 'category_id']);
        $categories = Category::all();

        return Inertia::render('backend/Admin/products', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'status']),
        ]);
    }
    
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('backend/Admin/create-product', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
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

        $product = Product::create([
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
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->update(['image' => $imagePath]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully!');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('backend/Admin/edit-product', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }
    
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'status' => 'required|boolean',
            'display_order' => 'nullable|integer|min:1',
        ]);

        $product->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'category_id' => $validated['category_id'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'display_order' => $validated['display_order'] ?? $product->display_order,
            'updated_by' => Auth::id(),
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->update(['image' => $imagePath]);
        }

        return redirect()->route('admin.products.index', $product->fresh()->slug)->with('success', 'Product updated successfully!');
    }
    
    public function delete(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
    }
}
