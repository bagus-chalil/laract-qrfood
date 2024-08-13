<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // Lakukan pencarian menggunakan Scout
        $transactionIds = Transaction::search($request->search)
        ->get()
        ->pluck('id'); // Ambil ID hasil pencarian

        // Lanjutkan query dengan Eloquent
        $transactions = Transaction::whereIn('id', $transactionIds)
        ->with('order.reservation_menu','order.user')
        ->whereHas('order.reservation_menu', function ($query) {
            $query->where('pic_id', Auth::user()->id);
        })
        ->paginate($request->filter ?? 10);


        return Inertia::render('User/Transaksi/Transaksi',[
            'transactions' => $transactions,
        ]);
    }
}
