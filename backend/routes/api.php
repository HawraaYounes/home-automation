<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemperatureController;
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
Route::controller(TemperatureController::class)->group(function () {
    Route::post('/temperature', "sendTemperature");
    Route::get('/temperature',"getTemperatures");
    Route::get('/last-temperature',"getLastTemperature");
});
