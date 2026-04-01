<?php

use App\Models\Setting;

if (!function_exists('setting')) {
    function setting($key = null)
    {
        $settings = Setting::first();

        if (!$settings) {
            return null;
        }

        if ($key === null) {
            return $settings;
        }
        return $settings->$key ?? null;
    }
}