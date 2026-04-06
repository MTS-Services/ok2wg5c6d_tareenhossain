<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $settings = Setting::first();

        return Inertia::render('backend/Admin/settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'website_name' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'website_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'ga_tracking_id' => 'nullable|string|max:50',
            'timezone' => 'nullable|string|max:100',
            'date_format' => 'nullable|string|max:50',
            'currency' => 'nullable|string|max:10',
            'maintenance_mode' => 'nullable|boolean',
            'email_notifications' => 'nullable|boolean',
            'analytics_enabled' => 'nullable|boolean',
            'tracking_enabled' => 'nullable|boolean',
            'data_retention_days' => 'nullable|integer|min:1|max:3650',
            'cache_duration_minutes' => 'nullable|integer|min:1|max:1440',
            'session_timeout_minutes' => 'nullable|integer|min:5|max:1200',
            'max_upload_size_mb' => 'nullable|integer|min:1|max:2048',
        ]);

        $setting = Setting::first() ?? new Setting();

        if ($request->hasFile('website_logo')) {
            $logoPath = $request->file('website_logo')->store('logo', 'public');
            $setting->website_logo = $logoPath;
        }

        if ($request->filled('website_name')) {
            $setting->website_name = $request->website_name;
        }
        if ($request->filled('contact_email')) {
            $setting->contact_email = $request->contact_email;
        }
        if ($request->has('ga_tracking_id')) {
            $setting->ga_tracking_id = $request->ga_tracking_id;
        }

        $setting->timezone = $request->input('timezone', $setting->timezone ?? 'UTC');
        $setting->date_format = $request->input('date_format', $setting->date_format ?? 'Y-m-d');
        $setting->currency = $request->input('currency', $setting->currency ?? 'USD');
        $setting->maintenance_mode = (bool) $request->boolean('maintenance_mode');
        $setting->email_notifications = (bool) $request->boolean('email_notifications', true);
        $setting->analytics_enabled = (bool) $request->boolean('analytics_enabled', true);
        $setting->tracking_enabled = (bool) $request->boolean('tracking_enabled', true);

        if ($request->filled('data_retention_days')) {
            $setting->data_retention_days = (int) $request->data_retention_days;
        }
        if ($request->filled('cache_duration_minutes')) {
            $setting->cache_duration_minutes = (int) $request->cache_duration_minutes;
        }
        if ($request->filled('session_timeout_minutes')) {
            $setting->session_timeout_minutes = (int) $request->session_timeout_minutes;
        }
        if ($request->filled('max_upload_size_mb')) {
            $setting->max_upload_size_mb = (int) $request->max_upload_size_mb;
        }

        $setting->save();

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }

    public function updateConnection(Request $request)
    {
        $request->validate([
            'ga_connected' => 'required|boolean',
            'ga_tracking_id' => 'nullable|string|max:50',
            'analytics_enabled' => 'nullable|boolean',
        ]);

        $setting = Setting::first() ?? new Setting();
        $setting->ga_connected = $request->ga_connected;

        if ($request->has('analytics_enabled')) {
            $setting->analytics_enabled = (bool) $request->boolean('analytics_enabled', true);
        }

        if ($request->filled('ga_tracking_id')) {
            $setting->ga_tracking_id = $request->ga_tracking_id;
        }

        $setting->save();

        return redirect()->route('admin.settings.index')
            ->with('success', 'Connection updated successfully.');
    }
}
