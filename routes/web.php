<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::domain('todo.jrecly.local')->group(function () {
    Route::get('/', Controllers\Todo\HomeController::class);
});

Route::domain('menu_circle.jrecly.local')->group(function () {
    Route::get('/', Controllers\MenuCircleHomeController::class);
});



Route::get('/', Controllers\HomeController::class);


