<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StayConnected;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StayConnectedController extends Controller
{
    public function landing(): Response
    {
        return Inertia::render('frontend/stay-connected', [
            'product' => null,
        ]);
    }

    public function index(string $slug): Response
    {
        $product = Product::where('slug', $slug)->first();

        return Inertia::render('frontend/stay-connected', [
            'product' => $product,
        ]);
    }

    public function store(Request $request)
    {
        $rawProductId = $request->input('product_id');
        $request->merge([
            'product_id' => ($rawProductId !== null && $rawProductId !== '')
                ? (int) $rawProductId
                : null,
        ]);

        $validated = $request->validate([
            'product_id' => ['nullable', 'integer', 'exists:products,id'],
            'number' => ['required', 'regex:/^[0-9+\-\s()]+$/', 'max:20'],
            'agree' => ['nullable', 'boolean'],
        ], [
            'number.regex' => 'Phone number can only contain numbers, spaces, and basic phone symbols (+, -, (, ))',
        ]);

        StayConnected::create([
            'product_id' => $validated['product_id'] ?? null,
            'number' => $validated['number'],
            'agree' => $validated['agree'] ?? false,
        ]);

        return back()->with('success', 'Successfully subscribed to stay connected!');
    }
}
