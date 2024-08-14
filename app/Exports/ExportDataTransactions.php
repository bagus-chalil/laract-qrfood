<?php

namespace App\Exports;

use App\Models\Transaction;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportDataTransactions implements FromView, ShouldAutoSize
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $data['transactions'] = Transaction::with('order.reservation_menu', 'order.user')->whereHas('order.reservation_menu', function ($query) {
                                    $query->where('pic_id', Auth::user()->id);
                                })->get();

        return view('export.data-transactions', [
            'transactions' => $data['transactions']
        ]);
    }
}
