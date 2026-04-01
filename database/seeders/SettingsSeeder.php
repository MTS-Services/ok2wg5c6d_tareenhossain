<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::insert([
            [
                'id' => 1,
                'website_name' => 'Nexus',
                'contact_email' => 'contact@mysite.com',
                'website_logo' => 'logo/nexus-logo.png',
                'ga_tracking_id' => 'UA-123456789-1',
                'ga_connected' => 0,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
