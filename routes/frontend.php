<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', [FrontendController::class, 'index'])->name('home');
    Route::get('/shop', [FrontendController::class, 'shop'])->name('shop');
    Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');
    Route::get('/products-details', [FrontendController::class, 'productsDetails'])->name('products-details');
    Route::get('/stay-connected', [FrontendController::class, 'stayConnected'])->name('stayconnected');
    Route::get('/faq', [FrontendController::class, 'faq'])->name('faq');
});
