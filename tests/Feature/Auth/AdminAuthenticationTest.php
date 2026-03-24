<?php

use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

function createAdmin(): Admin
{
    return Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@dev.com',
        'password' => Hash::make('admin@dev.com'),
    ]);
}

test('admin login screen can be rendered', function () {
    /** @var TestCase $this */
    $this->get(route('admin.login'))->assertOk();
});

test('admins can authenticate using the admin login screen', function () {
    /** @var TestCase $this */
    $admin = createAdmin();

    $response = $this->post(route('admin.login.store'), [
        'email' => 'admin@dev.com',
        'password' => 'admin@dev.com',
    ]);

    $this->assertAuthenticatedAs($admin, 'admin');
    $response->assertRedirect(route('admin.dashboard'));
});

test('admins cannot authenticate with invalid password', function () {
    /** @var TestCase $this */
    createAdmin();

    $this->post(route('admin.login.store'), [
        'email' => 'admin@dev.com',
        'password' => 'wrong-password',
    ]);

    $this->assertGuest('admin');
});

test('regular users cannot access admin routes', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertRedirect(route('admin.login'));
});

test('authenticated admins can access admin dashboard', function () {
    /** @var TestCase $this */
    $admin = createAdmin();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.dashboard'))
        ->assertOk();
});

test('authenticated admins can access admin products page', function () {
    /** @var TestCase $this */
    $admin = createAdmin();

    $this->actingAs($admin, 'admin');

    $response = $this->get(route('admin.products'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('backend/Admin/products')
    );
});

test('authenticated admins can access admin users track page', function () {
    /** @var TestCase $this */
    $admin = createAdmin();

    $this->actingAs($admin, 'admin');

    $response = $this->get(route('admin.users-track'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('backend/Admin/users-track')
    );
});

test('guests are redirected to admin login from admin routes', function () {
    /** @var TestCase $this */
    $this->get(route('admin.dashboard'))
        ->assertRedirect(route('admin.login'));
});

test('admins can logout', function () {
    /** @var TestCase $this */
    $admin = createAdmin();

    $this->actingAs($admin, 'admin')
        ->post(route('admin.logout'))
        ->assertRedirect(route('admin.login'));

    $this->assertGuest('admin');
});
