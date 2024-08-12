<?php

use Inertia\Inertia;
use App\Http\Controllers\Menu;
use App\Models\ReservationMenu;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QRController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderFoodController;
use App\Http\Controllers\ReservationMenuController;

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

Route::prefix('order/')->group(function () {
    Route::get('{kode_referal}', [OrderFoodController::class, 'index'])->name('order');
    Route::post('insert', [OrderFoodController::class, 'store']);
});
Route::get('QR/Show/{kode_transaction}', [QRController::class, 'show']);
Route::get('/qrcode/{code}', [QRController::class, 'generateQRCode']);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/route', [RouteController::class, 'index'])->name('route');
    Route::group(['middleware' => ['role:Admin']], function () {
        //Dashboard
        Route::get('dashboard', function () {
            return Inertia::render('Admin/Dashboard/Index');
        })->name('dashboard');

        //Users
        Route::prefix('users/')->group(function () {
            Route::get('',[UsersController::class,'index']);
        });

        //Category
        Route::prefix('category/')->group(function () {
            Route::get('',[CategoryController::class,'index']);
            Route::post('insert',[CategoryController::class,'store']);
            Route::post('update/{id}',[CategoryController::class,'update']);
            Route::delete('destroy',[CategoryController::class,'destroy']);
        });

        //Reservation Menu
        Route::prefix('reservation-menu/')->group(function () {
            Route::get('',[ReservationMenuController::class,'index']);
            Route::get('show',[ReservationMenuController::class,'show']);
            Route::post('insert',[ReservationMenuController::class,'store']);
            Route::get('edit/{id}',[ReservationMenuController::class,'edit']);
            Route::post('update/{id}',[ReservationMenuController::class,'update']);
            Route::delete('destroy',[ReservationMenuController::class,'destroy']);
        });

        //QR
        Route::prefix('qr/')->group(function () {
            Route::get('scanner',[QRController::class,'index']);
        });
    });

    Route::group(['middleware' => ['role:User']], function () {
        Route::get('home', function () {
            return Inertia::render('Dashboard');
        })->name('home');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

});

require __DIR__.'/auth.php';
