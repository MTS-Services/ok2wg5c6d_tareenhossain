<?php

use App\Http\Controllers\Backend\Admin\AdminDashboardController;
use App\Http\Controllers\Backend\Admin\AdminLoginController;
use App\Http\Controllers\Backend\ProductManagement\ProductController;
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
        Route::get('/category', [AdminDashboardController::class, 'Category'])->name('category');

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
    });
});
