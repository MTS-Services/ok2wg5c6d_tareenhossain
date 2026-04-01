<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('backend/Admin/AdminDashboard');
    }

    public function UsersTrack(Request $request)
    {
        return Inertia::render('backend/Admin/users-track');
    }

    public function Products(Request $request)
    {
        return Inertia::render('backend/Admin/products');
    }

    public function Analytics(Request $request)
    {
        return Inertia::render('backend/Admin/analytics');
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
