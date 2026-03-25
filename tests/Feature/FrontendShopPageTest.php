<?php

use function Pest\Laravel\get;

it('loads the frontend home page', function () {
    $response = get(route('home'));

    $response->assertSuccessful();
    $response->assertSee('frontend/home', false);
});

it('loads the frontend shop page', function () {
    $response = get(route('shop'));

    $response->assertSuccessful();
    $response->assertSee('frontend/shop', false);
});

it('loads the frontend contact page', function () {
    $response = get(route('contact'));

    $response->assertSuccessful();
    $response->assertSee('frontend/contact', false);
});

it('loads the frontend products-details page', function () {
    $response = get(route('products-details'));

    $response->assertSuccessful();
    $response->assertSee('frontend/products-details', false);
});
