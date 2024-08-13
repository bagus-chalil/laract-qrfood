<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('order.reservation_menu')->whereHas('order.reservation_menu', function ($query) {
                            $query->where('pic_id',Auth::user()->id);
                        })->get();

        return Inertia::render('User/Transaksi/Transaksi',[
            'transactions' => $transactions,
        ]);
    }
}
