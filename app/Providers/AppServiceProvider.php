<?php

namespace App\Providers;

use App\Contracts\Services\ComponentServiceContract;
use App\Contracts\Services\EquipmentServiceContract;
use App\Contracts\Services\InspectionServiceContract;
use App\Contracts\Services\SiteServiceContract;
use App\Contracts\Services\TableServiceContract;
use App\Services\ComponentService;
use App\Services\EquipmentService;
use App\Services\InspectionService;
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
        $this->app->bind(ComponentServiceContract::class, ComponentService::class);
        $this->app->bind(EquipmentServiceContract::class, EquipmentService::class);
        $this->app->bind(SiteServiceContract::class, SiteService::class);
        $this->app->bind(TableServiceContract::class, TableService::class);
        $this->app->bind(InspectionServiceContract::class, InspectionService::class);
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
