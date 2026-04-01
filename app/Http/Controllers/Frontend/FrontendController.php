<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\Contact;
use App\Models\Faq;
use App\Services\CategoryService;
use App\Services\ProductService;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Request;

class FrontendController extends Controller
{

    protected ProductService $service;
    protected CategoryService $categoryService;

    public function __construct(ProductService $service, CategoryService $categoryService)
    {
        $this->service = $service;
        $this->categoryService = $categoryService;
    }

    public function index(): Response
    {

        $products = $this->service->getAll();

        return Inertia::render('frontend/home', [
            'products' => $products,
        ]);
    }

    public function shop(): Response
    {
        $products = $this->service->getAll();
        $categories = $this->categoryService->getAll();
        
        return Inertia::render('frontend/shop', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('frontend/contact', [
            'flash' => [
                'success' => session('success'),
            ],
        ]);
    }

    public function contactStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:2000',
            'phone' => 'nullable|string|max:20',
        ], [
            'name.required' => 'Please enter your name',
            'email.required' => 'Please enter your email address',
            'email.email' => 'Please enter a valid email address',
            'message.required' => 'Please enter your message',
            'message.max' => 'Message must not exceed 2000 characters',
            'phone.max' => 'Phone number must not exceed 20 characters',
        ]);
        
        Contact::create($validated);
        
        Mail::to(config('mail.from.address'))->send(new ContactMail($validated));
        
        return redirect()->back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }

    public function productsDetails($slug): Response
    {
        $product = $this->service->getBySlug($slug);
        return Inertia::render('frontend/products-details', [
            'product' => $product,
        ]);
    }


    public function faq(): Response
    {
        $faqs = Faq::orderBy('id')->get(['id', 'question', 'answer']);
        
        return Inertia::render('frontend/faq', [
            'faqs' => $faqs,
        ]);
    }

    public function shipping(): Response
    {
        return Inertia::render('frontend/shipping');
    }

    public function return(): Response
    {
        return Inertia::render('frontend/return');
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('frontend/privacy-policy');
    }

    public function termsService(): Response
    {
        return Inertia::render('frontend/terms-service');
    }
}
