<?php

namespace App\Http\Controllers\Backend\ProductManagement;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
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
        $categories = $this->service->getCategories();
        $filters = $this->service->getFilters($request);

        // dd($products);

        return Inertia::render('backend/Admin/products', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }
    
    public function create()
    {
        $categories = $this->service->getCategories();
        return Inertia::render('backend/Admin/create-product', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $this->service->createProduct($request);
        return redirect()->route('admin.products.index')->with('success', 'Product created successfully!');
    }

    public function edit($product)
    {
        $product = $this->service->getBySlug($product);
        $categories = $this->service->getCategories();
        return Inertia::render('backend/Admin/edit-product', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }
    
public function update(Request $request, $product)
{
    $productModel = Product::where('slug', $product)->firstOrFail();
    $this->service->updateProduct($request, $productModel);
}
    
    public function delete($product)
    {
        $this->service->deleteProduct($product);
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
    }
}
