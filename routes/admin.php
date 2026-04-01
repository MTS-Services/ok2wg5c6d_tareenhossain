<?php

use App\Http\Controllers\Backend\Admin\CategoryController;
use App\Http\Controllers\Backend\Admin\AdminDashboardController;
use App\Http\Controllers\Backend\Admin\AdminLoginController;
use App\Http\Controllers\Backend\Admin\SettingsController;
use App\Http\Controllers\Backend\FaqManagement\FaqController;
use App\Http\Controllers\Backend\ProductManagement\ProductController;
use App\Http\Controllers\Backend\StayConnectedManagement\StayConnectedController;
use Illuminate\Support\Facades\Route;

// Admin Authentication Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [AdminLoginController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AdminLoginController::class, 'login'])->name('login.store');
    });

    Route::middleware(['admin'])->group(function () {
        Route::post('/logout', [AdminLoginController::class, 'logout'])->name('logout');
        Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
        Route::get('/users-track', [AdminDashboardController::class, 'UsersTrack'])->name('users-track');
        Route::get('/analytics', [AdminDashboardController::class, 'Analytics'])->name('analytics');
        Route::get('/settings', [AdminDashboardController::class, 'Settings'])->name('settings');
        Route::get('/edit-product', [AdminDashboardController::class, 'EditProduct'])->name('edit-product');

        /* Category Routes */
        Route::prefix('categories')->name('categories.')->group(function () {
            Route::get('/', [CategoryController::class, 'index'])->name('index');
            Route::post('/store', [CategoryController::class, 'store'])->name('store');
            Route::put('/{category}', [CategoryController::class, 'update'])->name('update');
            Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('destroy');
            Route::patch('/{category}/status', [CategoryController::class, 'updateStatus'])->name('status');
        });


        // Product Management Routes
        Route::prefix('products')->name('products.')->group(function () {
            Route::get('/', [ProductController::class, 'index'])->name('index');
            Route::get('/create', [ProductController::class, 'create'])->name('create');
            Route::post('/store', [ProductController::class, 'store'])->name('store');
            Route::get('/show', [ProductController::class, 'show'])->name('show');
            Route::get('/edit/{product:slug}', [ProductController::class, 'edit'])->name('edit');
            Route::post('/update/{product:slug}', [ProductController::class, 'update'])->name('update');
            Route::get('/delete/{product:slug}', [ProductController::class, 'delete'])->name('delete');
        });
        
        // FAQ Routes
        Route::prefix('faqs')->name('faqs.')->group(function () {
            Route::get('/', [FaqController::class, 'index'])->name('index');
            Route::get('/create', [FaqController::class, 'create'])->name('create');
            Route::post('/store', [FaqController::class, 'store'])->name('store');
            Route::get('/edit/{faq}', [FaqController::class, 'edit'])->name('edit');
            Route::post('/update/{faq}', [FaqController::class, 'update'])->name('update');
            Route::get('/delete/{faq}', [FaqController::class, 'delete'])->name('delete');
        });
        
        // Stay Connected Routes
        Route::prefix('stay-connected')->name('stay-connected.')->group(function () {
            Route::get('/', [StayConnectedController::class, 'index'])->name('index');
        });
        
        // Settings Routes
        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('/', [SettingsController::class, 'index'])->name('index');
            Route::post('/update', [SettingsController::class, 'update'])->name('update');
            Route::post('/update-connection', [SettingsController::class, 'updateConnection'])->name('update-connection');
        });
    });
});
