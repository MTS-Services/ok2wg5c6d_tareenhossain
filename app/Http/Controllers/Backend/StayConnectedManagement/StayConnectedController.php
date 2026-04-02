<?php

namespace App\Http\Controllers\Backend\StayConnectedManagement;

use App\Http\Controllers\Controller;
use App\Models\StayConnected;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StayConnectedController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->get('per_page', 10);
        $stayConnected = StayConnected::with('product')
            ->orderBy('id', 'desc')
            ->paginate($perPage, ['id', 'product_id', 'number', 'agree', 'created_at']);
        
        return Inertia::render('backend/stay-connected/index', [
            'stayConnected' => $stayConnected,
        ]);
    }
}
