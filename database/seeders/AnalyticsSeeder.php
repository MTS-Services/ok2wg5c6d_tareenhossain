<?php

namespace Database\Seeders;

use App\Models\SessionTimeline;
use App\Models\VisitorTracking;
use Illuminate\Database\Seeder;

class AnalyticsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        VisitorTracking::query()->delete();
        SessionTimeline::query()->delete();

        $countries = ['United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Australia'];
        $cities = ['New York', 'London', 'Toronto', 'Berlin', 'Paris', 'Sydney'];
        $devices = ['Desktop', 'Mobile', 'Tablet'];
        $browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
        $products = [
            'Wireless Headphones Pro',
            'Smart Watch Ultra',
            'Laptop Stand Premium',
            'USB-C Hub Multiport',
            'Mechanical Keyboard RGB',
            'Webcam HD 1080p',
            'Mouse Pad XL',
            'Monitor 27inch 4K',
            'Phone Case Premium',
            'Cable Management Kit'
        ];

        // Generate sample visitor data
        for ($i = 0; $i < 50; $i++) {
            $visitorId = 'VIS_' . strtoupper(uniqid());
            $country = $countries[array_rand($countries)];
            $city = $cities[array_rand($cities)];
            $device = $devices[array_rand($devices)];
            $browser = $browsers[array_rand($browsers)];
            $productClicked = rand(1, 10) <= 6 ? $products[array_rand($products)] : null;
            $duration = rand(30, 1800); // 30 seconds to 30 minutes

            $visitor = VisitorTracking::create([
                'visitor_id' => $visitorId,
                'ip_address' => '192.168.1.' . rand(1, 254),
                'country' => $country,
                'city' => $city,
                'device' => $device,
                'browser' => $browser,
                'page_visited' => '/' . (rand(1, 10) <= 5 ? 'products' : 'shop'),
                'product_clicked' => $productClicked,
                'duration' => $duration,
                'visit_time' => now()->subDays(rand(0, 30))->subHours(rand(0, 23))->subMinutes(rand(0, 59)),
            ]);

            // Create timeline events
            $events = ['Visited Page', 'Viewed Product', 'Clicked Product', 'Clicked Amazon Link'];
            $eventCount = rand(1, 4);

            for ($j = 0; $j < $eventCount; $j++) {
                SessionTimeline::create([
                    'visitor_id' => $visitorId,
                    'event' => $events[array_rand($events)],
                    'description' => $productClicked ?: 'General browsing',
                    'event_time' => $visitor->visit_time->addMinutes($j * 5),
                ]);
            }
        }

        $this->command->info('Analytics data seeded successfully!');
    }
}
