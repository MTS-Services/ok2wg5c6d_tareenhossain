<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', [FrontendController::class, 'index'])->name('home');
    Route::get('/shop', [FrontendController::class, 'shop'])->name('shop');
    Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');
    Route::post('/contact', [FrontendController::class, 'contactStore'])->name('contact.store');
    Route::get('/products/{slug}', [FrontendController::class, 'productsDetails'])->name('products-details');
    Route::get('/stay-connected', [FrontendController::class, 'stayConnected'])->name('stayconnected');
    Route::get('/faq', [FrontendController::class, 'faq'])->name('faq');
    Route::get('/shipping', [FrontendController::class, 'shipping'])->name('shipping');
    Route::get('/return', [FrontendController::class, 'return'])->name('return');
    Route::get('/privacy-policy', [FrontendController::class, 'privacyPolicy'])->name('privacy-policy');
    Route::get('/terms-service', [FrontendController::class, 'termsService'])->name('terms-service');
});
