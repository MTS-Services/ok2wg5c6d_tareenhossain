<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Spatie\Analytics\Exceptions\InvalidConfiguration;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\OrderBy;
use Spatie\Analytics\Period;
use Throwable;

class GoogleAnalyticsReportController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $periodKey = (string) $request->get('period', '7days');
            $period = $this->toPeriod($periodKey);

            $age = $this->rowsToChart(
                Analytics::get(
                    period: $period,
                    metrics: ['activeUsers'],
                    dimensions: ['userAgeBracket'],
                    maxResults: 20,
                    orderBy: [OrderBy::metric('activeUsers', true)],
                ),
                'userAgeBracket',
                'activeUsers'
            );

            $gender = $this->rowsToChart(
                Analytics::get(
                    period: $period,
                    metrics: ['activeUsers'],
                    dimensions: ['userGender'],
                    maxResults: 10,
                    orderBy: [OrderBy::metric('activeUsers', true)],
                ),
                'userGender',
                'activeUsers'
            );

            $interests = $this->rowsToChart(
                Analytics::get(
                    period: $period,
                    metrics: ['activeUsers'],
                    dimensions: ['brandingInterest'],
                    maxResults: 10,
                    orderBy: [OrderBy::metric('activeUsers', true)],
                ),
                'brandingInterest',
                'activeUsers'
            );

            $newVsReturning = $this->rowsToChart(
                Analytics::fetchUserTypes($period),
                'newVsReturning',
                'activeUsers'
            );

            $trafficSource = $this->rowsToChart(
                Analytics::get(
                    period: $period,
                    metrics: ['sessions'],
                    dimensions: ['sessionDefaultChannelGroup'],
                    maxResults: 10,
                    orderBy: [OrderBy::metric('sessions', true)],
                ),
                'sessionDefaultChannelGroup',
                'sessions'
            );

            $engagementTotals = Analytics::get(
                period: $period,
                metrics: ['activeUsers', 'sessions', 'engagedSessions', 'engagementRate', 'averageEngagementTime'],
                dimensions: [],
                maxResults: 1,
            )->first() ?? [];

            return response()->json([
                'enabled' => true,
                'period' => $periodKey,
                'age' => $age,
                'gender' => $gender,
                'interests' => $interests,
                'new_vs_returning' => $newVsReturning,
                'traffic_source' => $trafficSource,
                'engagement' => [
                    'activeUsers' => (int) ($engagementTotals['activeUsers'] ?? 0),
                    'sessions' => (int) ($engagementTotals['sessions'] ?? 0),
                    'engagedSessions' => (int) ($engagementTotals['engagedSessions'] ?? 0),
                    'engagementRate' => (float) ($engagementTotals['engagementRate'] ?? 0),
                    'averageEngagementTime' => (float) ($engagementTotals['averageEngagementTime'] ?? 0),
                ],
            ]);
        } catch (InvalidConfiguration $e) {
            return response()->json([
                'enabled' => false,
                'error' => $e->getMessage(),
            ], 200);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'enabled' => false,
                'error' => 'Failed to load Google Analytics data.',
            ], 200);
        }
    }

    private function toPeriod(string $periodKey): Period
    {
        return match ($periodKey) {
            '24hours' => Period::days(1),
            '7days' => Period::days(7),
            '30days' => Period::days(30),
            '90days' => Period::days(90),
            default => Period::days(7),
        };
    }

    /**
     * @return array<int, array{label: string, value: int}>
     */
    private function rowsToChart(Collection $rows, string $labelKey, string $valueKey): array
    {
        return $rows
            ->map(fn (array $row) => [
                'label' => (string) ($row[$labelKey] ?? 'Unknown'),
                'value' => (int) ($row[$valueKey] ?? 0),
            ])
            ->values()
            ->all();
    }
}

