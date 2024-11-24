<?php

namespace App\Providers;

use App\Contracts\Services\EquipmentServiceContract;
use App\Contracts\Services\SiteServiceContract;
use App\Contracts\Services\TableServiceContract;
use App\Services\EquipmentService;
use App\Services\SiteService;
use App\Services\TableService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->bind(EquipmentServiceContract::class, EquipmentService::class);
        $this->app->bind(SiteServiceContract::class, SiteService::class);
        $this->app->bind(TableServiceContract::class, TableService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
