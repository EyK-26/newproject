<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        //
    ];


    public function boot(): void
    {
        // Gate::define('has_role', function (User $user, string $role_name): bool {
        //     return $user->role === $role_name;
        // });
        Gate::define('admin', function (User $user): bool {
            return $user->role === 'admin';
        });
    }
}
