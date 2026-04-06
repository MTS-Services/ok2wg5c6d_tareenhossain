<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\SessionTimeline;
use App\Models\VisitorTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function trackProductImpression(Request $request)
    {
        $visitorId = session('visitor_id');

        SessionTimeline::create([
            'visitor_id'  => $visitorId,
            'event'       => 'Viewed Product',
            'description' => $request->product_name,
            'event_time'  => now(),
        ]);

        return response()->json(['success' => true]);
    }

    public function trackAmazonClick(Request $request)
    {
        $visitorId = session('visitor_id');

        SessionTimeline::create([
            'visitor_id'  => $visitorId,
            'event'       => 'Clicked Amazon Link',
            'description' => $request->product_name,
            'event_time'  => now(),
        ]);

        return response()->json(['success' => true]);
    }

    public function trackDuration(Request $request)
    {
        $visitorId = session('visitor_id');
        if (!$visitorId) return response()->json(['success' => false]);

        $data = json_decode($request->getContent(), true);
        $duration = intval($data['duration'] ?? 0);

        VisitorTracking::where('visitor_id', $visitorId)
            ->increment('duration', $duration);

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

    public function getAnalytics(Request $request)
    {
        $period = $request->get('period', '7days');
        $includeSessions = filter_var($request->get('include_sessions', true), FILTER_VALIDATE_BOOLEAN);

        $totalVisitors = VisitorTracking::count();
        $productClicks = VisitorTracking::whereNotNull('product_clicked')->count();

        // Calculate daily statistics based on period
        $dailyStats = $this->getDailyStats($period);

        $payload = [
            'total_visitors'  => $totalVisitors,
            'unique_visitors' => VisitorTracking::distinct('ip_address')->count(),
            'product_clicks'  => $productClicks,
            'ctr' => $totalVisitors > 0 ? ($productClicks / $totalVisitors) * 100 : 0,
            'top_products' => VisitorTracking::select(
                    'product_clicked',
                    DB::raw('count(*) as clicks')
                )
                ->whereNotNull('product_clicked')
                ->groupBy('product_clicked')
                ->orderByDesc('clicks')
                ->get(),
            'by_device' => VisitorTracking::select(
                    'device',
                    DB::raw('count(*) as count')
                )
                ->groupBy('device')
                ->get(),
            'by_country' => VisitorTracking::select(
                    'country',
                    DB::raw('count(*) as count')
                )
                ->groupBy('country')
                ->orderByDesc('count')
                ->take(5)
                ->get(),
            'daily_stats' => $dailyStats,
        ];

        if ($includeSessions) {
            $payload['sessions'] = $this->getSessions($request, $period);
        }

        return $payload;
    }

    private function getSessions(Request $request, string $period): array
    {
        $days = match($period) {
            '24hours' => 1,
            '7days' => 7,
            '30days' => 30,
            '90days' => 90,
            default => 7,
        };

        $startDate = now()->subDays($days - 1)->startOfDay();

        $query = VisitorTracking::query()
            ->where('created_at', '>=', $startDate)
            ->orderByDesc('visit_time')
            ->orderByDesc('id');

        if ($request->filled('search')) {
            $search = (string) $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('visitor_id', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%");
            });
        }

        if ($request->filled('device') && $request->get('device') !== 'all') {
            $query->where('device', $request->get('device'));
        }

        $visits = $query->limit(50)->get();

        $visitorIds = $visits->pluck('visitor_id')->filter()->values();
        $timelinesByVisitor = SessionTimeline::query()
            ->whereIn('visitor_id', $visitorIds)
            ->orderBy('event_time')
            ->get()
            ->groupBy('visitor_id');

        return $visits->map(function (VisitorTracking $visit) use ($timelinesByVisitor) {
            $timelineItems = ($timelinesByVisitor[$visit->visitor_id] ?? collect())->values();

            $mappedTimeline = $timelineItems->map(function (SessionTimeline $t, int $idx) use ($timelineItems) {
                $marker = 'middle';
                if ($idx === 0) $marker = 'start';
                if ($idx === max($timelineItems->count() - 1, 0)) $marker = 'end';

                return [
                    'time' => optional($t->event_time)->format('H:i') ?? '',
                    'title' => (string) $t->event,
                    'subtitle' => $t->description,
                    'marker' => $marker,
                ];
            })->all();

            $country = $visit->country ?: 'Unknown';
            $city = $visit->city ?: null;
            $location = $city ? "{$country}, {$city}" : $country;

            return [
                'visitor_id' => (string) $visit->visitor_id,
                'location' => $location,
                'device' => (string) ($visit->device ?: 'Unknown'),
                'page_visited' => (string) ($visit->page_visited ?: '—'),
                'product_clicked' => (string) ($visit->product_clicked ?: '—'),
                'duration' => $this->formatDuration((int) ($visit->duration ?? 0)),
                'visit_time' => optional($visit->visit_time)->toIso8601String()
                    ?? optional($visit->created_at)->toIso8601String()
                    ?? now()->toIso8601String(),
                'timeline' => $mappedTimeline,
            ];
        })->all();
    }

    private function formatDuration(int $seconds): string
    {
        if ($seconds <= 0) return '0s';

        $minutes = intdiv($seconds, 60);
        $remaining = $seconds % 60;

        if ($minutes <= 0) {
            return "{$remaining}s";
        }

        if ($remaining === 0) {
            return "{$minutes}m";
        }

        return "{$minutes}m {$remaining}s";
    }

    private function getDailyStats($period)
    {
        $days = match($period) {
            '24hours' => 1,
            '7days' => 7,
            '30days' => 30,
            '90days' => 90,
            default => 7,
        };

        $startDate = now()->subDays($days - 1)->startOfDay();

        // Generate daily stats from visitor_tracking data
        $stats = VisitorTracking::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as visitors'),
                DB::raw('COUNT(DISTINCT ip_address) as unique_visitors'),
                DB::raw('COUNT(CASE WHEN product_clicked IS NOT NULL THEN 1 END) as clicks')
            )
            ->where('created_at', '>=', $startDate)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get();

        // Fill missing dates with zeros
        $result = [];
        $currentDate = $startDate->copy();

        for ($i = 0; $i < $days; $i++) {
            $dateStr = $currentDate->format('Y-m-d');
            $dayData = $stats->firstWhere('date', $dateStr);

            $result[] = [
                'date' => $dateStr,
                'visitors' => $dayData->visitors ?? 0,
                'unique_visitors' => $dayData->unique_visitors ?? 0,
                'clicks' => $dayData->clicks ?? 0,
            ];

            $currentDate->addDay();
        }

        return $result;
    }

    public function refreshAnalytics(Request $request)
    {
        // Return the latest analytics payload so the UI can refresh without hacks.
        return response()->json([
            'success' => true,
            'analytics' => $this->getAnalytics($request),
        ]);
    }
}
