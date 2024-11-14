<?php

namespace App\Providers;

use App\Contracts\Services\Auth\RegisterServiceContract;
use App\Services\Auth\RegisterService;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }

    public function register(): void
    {
        $this->app->bind(RegisterServiceContract::class, RegisterService::class);
    }
}
