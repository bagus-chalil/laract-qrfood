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

    public function show($kode_referal,$id)
    {
        $transactions = Transaction::with('order.reservation_menu')->where('id',$id)->first();
        $user = User::where('referal_code',$transactions->order->referal_code)->first();

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

    public function processQRTransaction($code)
    {
        $transactions = Transaction::with('order.reservation_menu')->where('transaction_code',$code)->first();

        if ($transactions) {
            if ($transactions->order->reservation_menu->pic_id != Auth::user()->id) {
                return redirect(url('/qr/scanner'))->with('alert', [
                    'type' => 'error',
                    'message' => 'QR bukan dari kategori Anda!',
                ]);
            } else {
                if ($transactions->is_active == 0) {
                    return redirect(url('/qr/scanner'))->with('alert', [
                        'type' => 'error',
                        'message' => 'QR transaksi sudah digunakan!',
                    ]);
                } else {
                    $transactions->update(['is_active' => '0']);
                }
            }
        } else {
            return redirect(url('/qr/scanner'))->with('alert', [
                'type' => 'error',
                'message' => 'QR transaksi tidak valid!',
            ]);
        }

        return redirect(url('/qr/scanner'))->with('alert', [
            'type' => 'success',
            'message' => 'QR berhasil discaned!',
        ]);
    }
}
