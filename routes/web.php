<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/settings.php';
require __DIR__.'/frontend.php';
require __DIR__.'/user.php';
require __DIR__.'/admin.php';

// Live Search API
Route::get('/api/search', [FrontendController::class, 'liveSearch']);
