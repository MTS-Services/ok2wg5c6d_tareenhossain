<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;

it('migrates users table with index-safe string columns', function () {
    expect(Schema::hasTable('users'))->toBeTrue();

    User::factory()->create(['email' => 'schema-test@example.com']);

    expect(User::query()->where('email', 'schema-test@example.com')->exists())->toBeTrue();
});
