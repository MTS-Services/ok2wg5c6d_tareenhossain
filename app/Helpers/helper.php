<?php

use App\Models\Setting;
use App\Models\Category;

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
if (!function_exists('getAllCategories')) {
    function getAllCategories()
    {
        return Category::latest()->get(['id', 'title', 'slug']);
    }
}

