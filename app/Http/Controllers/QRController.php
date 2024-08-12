<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
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
        return Inertia::render('User/QR/QRShow',[
            'sessions' => session()->all(),
            'transactionCode' => $kode_referal
        ]);
    }

    public function generateQRCode($code)
    {
        $qrCode = QrCode::format('png')->size(200)->generate($code);
        return response($qrCode)->header('Content-type', 'image/png');
    }
}
