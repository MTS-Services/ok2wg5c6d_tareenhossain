<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\SessionTimeline;
use App\Models\VisitorTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TrackingController extends Controller
{
    public function trackProductClick(Request $request)
{
    $visitorId = session('visitor_id');

    VisitorTracking::where('visitor_id', $visitorId)
        ->update(['product_clicked' => $request->product_name]);

    SessionTimeline::create([
        'visitor_id'  => $visitorId,
        'event'       => 'Clicked Product',
        'description' => $request->product_name,
        'event_time'  => now(),
    ]);

    return response()->json(['success' => true]);
}

public function getTrackingData(Request $request)
{
    $query = VisitorTracking::query();
    
    if ($request->search) {
        $query->where('visitor_id', 'like', "%{$request->search}%")
              ->orWhere('country', 'like', "%{$request->search}%");
    }
    
    if ($request->device && $request->device !== 'all') {
        $query->where('device', $request->device);
    }

    return $query->paginate(7);
}
public function getAnalytics()
{
    return [
        'total_visitors'    => VisitorTracking::count(),
        'unique_visitors'   => VisitorTracking::distinct('ip_address')->count(),
        'product_clicks'    => VisitorTracking::whereNotNull('product_clicked')->count(),
        'ctr'               => VisitorTracking::whereNotNull('product_clicked')->count() / VisitorTracking::count() * 100,
        'top_products'      => VisitorTracking::select('product_clicked', DB::raw('count(*) as clicks'))
                                ->whereNotNull('product_clicked')
                                ->groupBy('product_clicked')
                                ->orderByDesc('clicks')
                                ->get(),
        'by_device'         => VisitorTracking::select('device', DB::raw('count(*) as count'))
                                ->groupBy('device')->get(),
        'by_country'        => VisitorTracking::select('country', DB::raw('count(*) as count'))
                                ->groupBy('country')->orderByDesc('count')->take(5)->get(),
    ];
}
}
