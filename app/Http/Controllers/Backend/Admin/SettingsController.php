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
            'website_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'website_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'ga_tracking_id' => 'nullable|string|max:50',
        ]);

        $setting = Setting::first() ?? new Setting();

        if ($request->hasFile('website_logo')) {
            $logoPath = $request->file('website_logo')->store('logo', 'public');
            $setting->website_logo = $logoPath;
        }

        $setting->website_name = $request->website_name;
        $setting->contact_email = $request->contact_email;
        $setting->ga_tracking_id = $request->ga_tracking_id;
        $setting->save();

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }

    public function updateConnection(Request $request)
    {
        $request->validate([
            'ga_connected' => 'required|boolean',
            'ga_tracking_id' => 'nullable|string|max:50',
        ]);

        $setting = Setting::first() ?? new Setting();
        $setting->ga_connected = $request->ga_connected;


        if ($request->filled('ga_tracking_id')) {
            $setting->ga_tracking_id = $request->ga_tracking_id;
        }

        $setting->save();

        return redirect()->route('admin.settings.index')
            ->with('success', 'Connection updated successfully.');
    }
}
