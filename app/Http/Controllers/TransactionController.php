<?php

namespace App\Http\Controllers;

use App\Exports\ExportDataTransactions;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // Start with a query on the Transaction model
        $query = Transaction::query();

        // If there is a search term, apply the search conditions
        if ($request->filled('search')) {
            $searchTerm = '%' . $request->search . '%';

            $query->where('transaction_code', 'like', $searchTerm);
                // ->orWhereHas('order.user', function (Builder $query) use ($searchTerm) {
                //     $query->where('name', 'like', $searchTerm)
                //             ->orWhere('email', 'like', $searchTerm);
                // });
        }

        // Continue with the other query modifications
        $query->with('order.reservation_menu', 'order.user')
            ->whereHas('order.reservation_menu', function ($query) {
                $query->where('pic_id', Auth::user()->id);
            });

        // Paginate the results
        $transactions = $query->paginate($request->filter ?? 10)
                            ->appends('query', null)
                            ->withQueryString();

        // Render the page with the transactions data
        return Inertia::render('User/Transaksi/Transaksi', [
            'transactions' => $transactions,
        ]);
    }

    public function export_data_transacions(){
        return Excel::download(new ExportDataTransactions, 'transaction_'.date('d-m-y').'.xlsx');
    }

}
