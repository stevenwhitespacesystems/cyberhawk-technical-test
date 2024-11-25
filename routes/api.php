<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Component\TableController as ComponentTableController;
use App\Http\Controllers\Equipment\AllGeoJsonDataController as EquipmentAllGeoJsonDataController;
use App\Http\Controllers\Equipment\TableController as EquipmentTableController;
use App\Http\Controllers\Site\AllGeoJsonDataController as SiteAllGeoJsonDataController;
use App\Http\Controllers\Site\TableController as SiteTableController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::group(['prefix' => 'auth'], static function () {
    Route::post('/login', LoginController::class);
    Route::post('/register', RegisterController::class);
});

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::group(['prefix' => 'auth'], static function () {
        Route::get('/verify', VerifyController::class);
        Route::get('/logout', LogoutController::class);
    });
    Route::group(['prefix' => 'sites'], static function () {
        Route::get('/all-geo-json', SiteAllGeoJsonDataController::class);
        Route::post('/table-data', SiteTableController::class);
    });
    Route::group(['prefix' => 'equipment'], static function () {
        Route::get('/all-geo-json', EquipmentAllGeoJsonDataController::class);
        Route::post('/table-data', EquipmentTableController::class);
    });
    Route::group(['prefix' => 'components'], static function () {
        Route::post('/table-data', ComponentTableController::class);
    });
});
