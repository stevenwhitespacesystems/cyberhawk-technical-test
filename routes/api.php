<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Site\AllGeoJsonDataController;
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
        Route::get('/all-geo-json', AllGeoJsonDataController::class);
    });
});
