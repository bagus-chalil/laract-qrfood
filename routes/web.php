<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Menu;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Landing/Index');
})->name('landing');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard/Index');
    })->name('dashboard');

    //Users
    Route::prefix('/users/')->group(function () {
        Route::get('',[UsersController::class,'index']);
    });

    //Category
    Route::prefix('/category/')->group(function () {
        Route::get('',[CategoryController::class,'index']);
        Route::post('insert',[CategoryController::class,'store']);
        Route::post('update/{id}',[CategoryController::class,'update']);
        Route::delete('destroy',[CategoryController::class,'destroy']);
    });

    //menu
    Route::prefix('menu/')->group(function () {
        Route::get('',[MenuController::class,'index']);
        Route::post('',[MenuController::class,'index']);
    });


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
