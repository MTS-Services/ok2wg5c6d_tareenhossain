<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('frontend/home');
    }

    public function shop(): Response
    {
        return Inertia::render('frontend/shop');
    }

    public function contact(): Response
    {
        return Inertia::render('frontend/contact');
    }

    public function productsDetails(): Response
    {
        return Inertia::render('frontend/products-details');
    }

    public function stayConnected(): Response
    {
        return Inertia::render('frontend/stay-connected');
    }

    public function faq(): Response
    {
        return Inertia::render('frontend/faq');
    }
}
