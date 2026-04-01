<?php

namespace App\Http\Controllers\Backend\StayConnectedManagement;

use App\Http\Controllers\Controller;
use App\Models\StayConnected;
use Inertia\Inertia;
use Inertia\Response;

class StayConnectedController extends Controller
{
    public function index(): Response
    {
        $stayConnected = StayConnected::with('product')
            ->orderBy('id', 'desc')
            ->get(['id', 'product_id', 'number', 'agree', 'created_at']);
        
        return Inertia::render('backend/stay-connected/index', [
            'stayConnected' => $stayConnected,
        ]);
    }
}
