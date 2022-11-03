<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemperatureController;
use App\Http\Controllers\HistoryController;

//TemperatureController
Route::controller(TemperatureController::class)->group(function () {
    Route::post('/temperature', "sendTemperature");
    Route::get('/temperature',"getTemperatures");
    Route::get('/last-temperature',"getLastTemperature");
});
//HistoryController
Route::controller(HistoryController::class)->group(function () {
   
});

