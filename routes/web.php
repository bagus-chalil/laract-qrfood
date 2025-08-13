<?php
use Inertia\Inertia;
use App\Http\Controllers\Menu;
use App\Models\ReservationMenu;
use App\Helper\AutoGenerateReferal;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QRController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderFoodController;
use App\Http\Controllers\TransactionController;
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
Route::get('QR/Show/{kode_referal}', [QRController::class, 'show']);
Route::get('/qrcode/{code}', [QRController::class, 'generateQRCode']);

//Auto Referal
Route::get('/auto-referal', [AutoGenerateReferal::class, 'generateReferalCodesForUsers']);

//Register Gues
Route::get('iaysdiuyaisdyuiayduijakjhdkjhkhqkjh/guest-registration',[UsersController::class,'guestRegistration']);
Route::post('/guest-registration', [UsersController::class, 'postGuestRegistration'])
    ->name('guest-registration');

Route::get('/guest/{referalCode}', [UsersController::class, 'viewGuestReferalCodeRegistration'])
    ->name('view-referal-code-guest');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/route', [RouteController::class, 'index'])->name('route');

    //QR
    Route::prefix('qr/')->group(function () {
        Route::get('scanner',[QRController::class,'index'])->name('qr.scanner');
        Route::post('verif-transaction/{kode}',[QRController::class,'processQRTransaction']);
    });

    Route::get('verif-transaction/{kode}',[QRController::class,'processQRTransaction']);

    Route::group(['middleware' => ['role:Admin']], function () {
        //Dashboard
        Route::get('dashboard', function () {
            return Inertia::render('Admin/Dashboard/Index');
        })->name('dashboard');

        //Users
        Route::prefix('users/')->group(function () {
            Route::get('',[UsersController::class,'index']);
            Route::post('insert',[UsersController::class,'store']);
            Route::post('update/{id}',[UsersController::class,'update']);
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

        Route::get('/list-all-transaction', [TransactionController::class, 'all_transaction'])->name('admin.transaction');
        Route::get('/export-all-transaction', [TransactionController::class, 'export_all_data_transacions'])->name('export.alltransaction');
    });

    Route::group(['middleware' => ['role:User']], function () {
        Route::get('home', function () {
            return Inertia::render('Dashboard');
        })->name('home');

        Route::get('/list-transaction', [TransactionController::class, 'index'])->name('transaction');
        Route::get('/export-transaction', [TransactionController::class, 'export_data_transacions'])->name('export.transaction');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

});

require __DIR__.'/auth.php';
