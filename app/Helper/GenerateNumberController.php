<?php

namespace App\Helper;

use Carbon\Carbon;
use App\Models\Orders;
use App\Models\Transaction;
use App\Models\ReservationMenu;
use App\Http\Controllers\Controller;

class GenerateNumberController extends Controller
{
    /**
     * Generate number.
     *
     * @return \Illuminate\Http\Response
     */
    public function generate_code_order($param){
        $model = new Transaction();

        //Generate Kode Master Customer
        $bulan      = date('m');
        $tahun      = date('Y');
        $thn        = substr($tahun,2,2);
        $reservationMenu = ReservationMenu::find($param);

        $code       = $reservationMenu->reservation_menu_code;

        do {
            $lastcode   = $model->whereMonth('created_at',$bulan)->whereYear('created_at',$tahun)->Where('transaction_code', 'like', $code . '%')->orderBy('transaction_code','DESC')->first();
            if($lastcode == null) {
                $nomorterakhir = "00";
            } else {
                $nomorterakhir = substr($lastcode->booking_code, -4);
            }
            $transaction_code = $code.$bulan.$thn.str_pad($nomorterakhir + 1, 4, '0', STR_PAD_LEFT);

            // Check if the code already exists
            $exists = $model->where('transaction_code', $transaction_code)->first() != null;
        } while($exists);

        return $transaction_code;

    }
}
