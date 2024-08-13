<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Orders;
use App\Models\Category;
use App\Models\OrderFood;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\ReservationMenu;
use App\Helper\GenerateNumberController;

class OrderFoodController extends Controller
{
    public function __construct()
    {
        $this->code = new GenerateNumberController;
    }
    /**
     * Display a listing of the resource.
     */
    public function index($referal_code)
    {
        $is_valid_referal = User::where('referal_code',$referal_code)->first();

        if (empty($is_valid_referal)) {
            return redirect()->route('landing')->with('alert', [
                'type' => 'error',
                'message' => 'Kode Referal tidak ada!',
            ]);
        }

        $reservationMenu = ReservationMenu::all();
        $transactions = Orders::with('transaction','reservation_menu.category')->where('referal_code', $referal_code)->get();

        return Inertia::render('User/Order/Order',[
            'transactions' => $transactions,
            'reservationMenu' => $reservationMenu,
            'kode_referal' => $referal_code,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $referalCode = $request->referal_code;
        $selectedFood = $request->selectedFood;
        $selectedSnacks = $request->selectedSnacks;
        $selectedDrink = $request->selectedDrink;
        $reservationMenuIds = array_merge($selectedFood, $selectedSnacks, $selectedDrink);

        // Check if the referal code is already used
        if (Orders::where('referal_code', $referalCode)->exists()) {
            return redirect()->route('landing')->with('alert', [
                'type' => 'error',
                'message' => 'Kode Referal telah digunakan!',
            ]);
        }

        // Fetch all reservation menus and their quotas
        $reservationMenus = ReservationMenu::whereIn('id', $reservationMenuIds)->get()->keyBy('id');

        // Check quota and prepare data for bulk insertion
        $orders = [];
        $transactions = [];
        $updateQuotaData = [];

        foreach ($reservationMenuIds as $menuId) {
            $reservationMenu = $reservationMenus->get($menuId);

            if ($reservationMenu->quota >= $reservationMenu->limit) {
                return redirect(back())->with('alert', [
                    'type' => 'error',
                    'message' => 'Kuota telah terpenuhi untuk salah satu menu!',
                ]);
            }

            $order = [
                'reservation_menu_id' => $menuId,
                'referal_code' => $referalCode,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $orders[] = $order;

            $transaction = [
                'transaction_code' => $this->code->generate_code_order($menuId),
                'order_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $transactions[] = $transaction;

            // Prepare quota update data
            if (!isset($updateQuotaData[$menuId])) {
                $updateQuotaData[$menuId] = ['quota' => $reservationMenu->quota + 1];
            }
        }

        // Insert orders and transactions in bulk
        Orders::insert($orders);
        $orderIds = Orders::where('referal_code', $referalCode)->pluck('id')->toArray();

        foreach ($transactions as $index => &$transaction) {
            $transaction['order_id'] = $orderIds[$index];
        }
        Transaction::insert($transactions);

        // Update quotas in bulk
        foreach ($updateQuotaData as $menuId => $data) {
            ReservationMenu::where('id', $menuId)->update($data);
        }

        return redirect()->route('landing')->with('alert', [
            'type' => 'success',
            'message' => 'Pemesanan Makanan Berhasil!',
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(OrderFood $orderFood)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderFood $orderFood)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderFood $orderFood)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderFood $orderFood)
    {
        //
    }
}
