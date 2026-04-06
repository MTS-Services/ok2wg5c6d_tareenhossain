<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/settings.php';
require __DIR__.'/frontend.php';
require __DIR__.'/user.php';
require __DIR__.'/admin.php';

// Visitor tracking (public web)
Route::post('/track/product-click', [\App\Http\Controllers\Backend\Admin\TrackingController::class, 'trackProductClick']);
Route::post('/track/product-impression', [\App\Http\Controllers\Backend\Admin\TrackingController::class, 'trackProductImpression']);
Route::post('/track/amazon-click', [\App\Http\Controllers\Backend\Admin\TrackingController::class, 'trackAmazonClick']);
Route::post('/track/duration', [\App\Http\Controllers\Backend\Admin\TrackingController::class, 'trackDuration']);

// Live Search API
Route::get('/api/search', [FrontendController::class, 'liveSearch']);
