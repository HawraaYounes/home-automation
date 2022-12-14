<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TemperatureController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\MemoryController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\MessageController;

//AuthController
Route::post('login', [AuthController::class, "login"]);
Route::post('register', [AuthController::class, "register"]);

Route::group(['middleware' => 'auth:api','prefix' => 'auth'], function () {
//TemperatureController
Route::controller(TemperatureController::class)->group(function () {
    Route::post('/new-temperature', "sendTemperature");
    Route::get('/temperature',"getTemperatures");
    Route::get('/last-temperature',"getLastTemperature");
});
//HistoryController
Route::controller(HistoryController::class)->group(function () {
    Route::get('/history',"getHistories");
    Route::post('/new-history',"addHistory");
    Route::get('/delete/{id}',"deleteHistory");
});
//PasswordController
Route::controller(PasswordController::class)->group(function () {
    Route::post('/password',"updatePassword");
});
//DeviceController
Route::controller(DeviceController::class)->group(function () {
    Route::get('/devices',"getDevices");
    Route::post('/status',"getStatus");
    Route::post('/device/on',"turnOn");
    Route::post('/device/off',"turnOff");
});
//UserController
Route::controller(UserController::class)->group(function () {
    Route::get('/users',"getUsers");
});
//AlbumController
Route::controller(AlbumController::class)->group(function () {
    Route::get('/albums',"getAlbums");
    Route::post('/new-album',"addAlbum");
});
//MemoryController
Route::controller(MemoryController::class)->group(function () {
    Route::get('/images/{id}',"getMemories");
    Route::post('/new-memory',"addMemory");
});
//MessageController
Route::controller(MessageController::class)->group(function () {
    Route::get('/messages',"getMessages");
    Route::post('/message',"sendMessage");
});

});
Route::controller(TemperatureController::class)->group(function () {
    Route::post('/new-temperature', "sendTemperature");
});
Route::controller(DeviceController::class)->group(function () {
    Route::post('/status',"getStatus");
});
