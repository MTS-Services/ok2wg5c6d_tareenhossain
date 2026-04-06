<?php

return [
    /*
     * The GA4 property id of which you want to display data.
     * Example: 123456789
     */
    'property_id' => env('ANALYTICS_PROPERTY_ID'),

    /*
     * Path to the service account json file, or an array of credentials.
     *
     * Recommended: keep the json file outside the public path, e.g.
     * storage/app/analytics/service-account-credentials.json
     */
    'service_account_credentials_json' => env(
        'ANALYTICS_CREDENTIALS_PATH',
        storage_path('app/analytics/service-account-credentials.json')
    ),

    /*
     * The amount of minutes the Google API responses will be cached.
     * If you set this to zero, the responses won't be cached at all.
     */
    'cache_lifetime_in_minutes' => (int) env('ANALYTICS_CACHE_MINUTES', 60 * 24),

    /*
     * Here you may configure the "store" that the underlying Google client will
     * use to store its cached data.
     */
    'cache' => [
        'store' => env('ANALYTICS_CACHE_STORE', 'file'),
    ],
];

