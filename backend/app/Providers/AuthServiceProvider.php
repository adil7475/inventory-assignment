<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //'App\Models\Product' => 'App\Policies\ProductPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('create-product', function (User $user) {
            return $user->isAdmin();
        });

        Gate::define('view-product', function (User $user) {
            return $user->isAdmin() || $user->isClient();
        });

        Gate::define('update-product', function (User $user) {
            return $user->isAdmin() || $user->isModerator();
        });

        Gate::define('delete-product', function (User $user) {
            return $user->isAdmin();
        });
    }
}
