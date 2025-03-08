<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Offer;
use App\Policies\OfferPolicy;
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
        Offer::class => OfferPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Optionally define a super-admin gate
        Gate::before(function ($user, $ability) {
            // Grant all permissions to administrators
            if ($user->hasRole('admin')) {
                return true;
            }
        });
    }
}
