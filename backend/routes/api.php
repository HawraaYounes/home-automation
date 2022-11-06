<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemperatureController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AlbumController;

//TemperatureController
Route::controller(TemperatureController::class)->group(function () {
    Route::post('/temperature', "sendTemperature");
    Route::get('/temperature',"getTemperatures");
    Route::get('/last-temperature',"getLastTemperature");
});
//HistoryController
Route::controller(HistoryController::class)->group(function () {
    Route::get('/history',"getHistories");
    Route::post('/history',"addHistory");
    Route::get('/delete/{id}',"deleteHistory");
});
//PasswordController
Route::controller(PasswordController::class)->group(function () {
    Route::post('/password',"updatePassword");
});
//UserController
Route::controller(UserController::class)->group(function () {
    Route::get('/users',"getUsers");
});
//AlbumController
Route::controller(AlbumController::class)->group(function () {
    Route::get('/albums',"getAlbums");
});
