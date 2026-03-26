<?php

use App\Http\Controllers\Backend\Admin\AdminDashboardController;
use App\Http\Controllers\Backend\Admin\AdminLoginController;
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
        Route::get('/products', [AdminDashboardController::class, 'Products'])->name('products');
        Route::get('/analytics', [AdminDashboardController::class, 'Analytics'])->name('analytics');
        Route::get('/settings', [AdminDashboardController::class, 'Settings'])->name('settings');
        Route::get('/edit-product', [AdminDashboardController::class, 'EditProduct'])->name('edit-product');
    });
});
