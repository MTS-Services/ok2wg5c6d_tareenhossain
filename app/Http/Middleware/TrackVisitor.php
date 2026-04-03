<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\VisitorTracking;
use App\Models\SessionTimeline;
use Jenssegers\Agent\Agent;
use Stevebauman\Location\Facades\Location;

class TrackVisitor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('api/*') || $request->is('admin/*')) {
            return $next($request);
        }

        $agent = new Agent();
        $ip = $request->ip();
        $position = Location::get($ip);

        // Session-based unique visitor ID
        if (!session()->has('visitor_id')) {
            session(['visitor_id' => 'VIS-' . strtoupper(uniqid())]);
        }

        $visitorId = session('visitor_id');

        // Device type
        $device = 'Desktop';
        if ($agent->isMobile()) $device = 'Mobile';
        elseif ($agent->isTablet()) $device = 'Tablet';

        VisitorTracking::updateOrCreate(
            ['visitor_id' => $visitorId],
            [
                'ip_address'   => $ip,
                'country'      => $position ? $position->countryName : 'Unknown',
                'city'         => $position ? $position->cityName : 'Unknown',
                'device'       => $device,
                'browser'      => $agent->browser(),
                'page_visited' => '/' . $request->path(),
                'visit_time'   => now(),
            ]
        );

        // Timeline log
        SessionTimeline::create([
            'visitor_id'  => $visitorId,
            'event'       => 'Visited Page',
            'description' => '/' . $request->path(),
            'event_time'  => now(),
        ]);

        return $next($request);
    }
}
