<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $analytics = app(TrackingController::class)->getAnalytics($request);

        return Inertia::render('backend/Admin/AdminDashboard', [
            'dashboard' => [
                'total_visitors' => $analytics['total_visitors'] ?? 0,
                'product_clicks' => $analytics['product_clicks'] ?? 0,
                'total_products' => Product::count(),
                'daily_stats' => $analytics['daily_stats'] ?? [],
                'top_products' => $analytics['top_products'] ?? [],
            ],
        ]);
    }

    public function UsersTrack(Request $request)
    {
        $analytics = app(TrackingController::class)->getAnalytics($request);
        return Inertia::render('backend/Admin/users-track', [
            'analytics' => $analytics,
        ]);
    }

    public function Products(Request $request)
    {
        return Inertia::render('backend/Admin/products');
    }

    public function Analytics(Request $request)
    {
        $analytics = app(TrackingController::class)->getAnalytics($request);
        return Inertia::render('backend/Admin/analytics', [
            'analytics' => $analytics,
        ]);
    }

    // public function Settings(Request $request)
    // {
    //     return Inertia::render('backend/Admin/settings');
    // }

    public function EditProduct(Request $request)
    {
        return Inertia::render('backend/Admin/edit-product');
    }
}
