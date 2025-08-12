<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QRController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/QR/QRScanner',[
            'sessions' => session()->all()
        ]);
    }

    public function show($kode_referal)
    {
        $user = User::where('referal_code',$kode_referal)->first();
        $transactions = Transaction::with('order.reservation_menu')
                        ->whereHas('order', function($q) use ($user) {
                            $q->where('referal_code', $user->referal_code);
                        })
                        ->latest()
                        ->get();

        return Inertia::render('User/QR/QRShow',[
            'sessions' => session()->all(),
            'user' => $user,
            'transactions' => $transactions,
        ]);
    }

    public function generateQRCode($code)
    {
        $qrCode = QrCode::format('png')->size(200)->generate($code);
        return response($qrCode)->header('Content-type', 'image/png');
    }

    public function processQRTransaction(Request $request, $code)
    {
        $user = User::where('referal_code', $code)->first();
        // Ambil maksimal 3 transaksi terbaru untuk user
        $transactions = Transaction::with('order.reservation_menu')
            ->whereHas('order', function($q) use ($code) {
                $q->where('referal_code', $code);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        if ($transactions->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tidak ada transaksi ditemukan untuk QR ini.'
            ], 404);
        }

        // Cek apakah ada transaksi yang sudah digunakan
        foreach ($transactions as $transaction) {
            if ($transaction->is_active == 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'QR ' . $transaction->order->reservation_menu->name . ' sudah digunakan!'
                ], 400);
            }
        }

        // Update semua jadi tidak aktif
        foreach ($transactions as $transaction) {
            $transaction->update(['is_active' => '0']);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'QR ' . $user->name . ' berhasil discan!',
            'menus' => $transactions->pluck('order.reservation_menu.name')
        ]);
    }

}
