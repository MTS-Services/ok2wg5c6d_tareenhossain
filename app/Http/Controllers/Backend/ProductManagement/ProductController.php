<?php

namespace App\Http\Controllers\Backend\ProductManagement;

use App\Http\Controllers\Controller;
use App\Enums\DiscountType;
use App\Enums\ProductType;
use App\Models\Category;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected ProductService $service;

    public function __construct(ProductService $service)
    {
        $this->service = $service;
    }
    public function index(Request $request)
    {
        $products = $this->service->getFilteredProducts($request);
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

        $product = $this->service->create($productData);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->update(['image' => $imagePath]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully!');
    }

    public function edit($product)
    {
        $product = $this->service->getBySlug($product);
        $categories = Category::all();
        return Inertia::render('backend/Admin/edit-product', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }
    
    public function update(Request $request, $product)
    {
        $product = $this->service->getBySlug($product);
        
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

        $this->service->updateBySlug($product->slug, $productData);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->update(['image' => $imagePath]);
        }

        return redirect()->route('admin.products.index', $product->fresh()->slug)->with('success', 'Product updated successfully!');
    }
    
    public function delete($product)
    {
        $this->service->deleteBySlug($product);
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
    }
}
