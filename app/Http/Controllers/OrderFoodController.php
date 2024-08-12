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
                'message' => 'Invalid referral code!',
            ]);
        }

        $categories = Category::all();
        $reservationMenu = ReservationMenu::all();

        return Inertia::render('OrderFood/OrderFood',[
            'categories' => $categories,
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
        $checkOrder = Orders::where('referal_code',$request->referal_code)->count();
        $reservation_menu_id = array_merge($request->selectedFood,$request->selectedSnacks,$request->selectedDrink);

        if ($checkOrder === 0) {
           foreach ($reservation_menu_id as $value) {
                $data_order = array(
                    'reservation_menu_id' => $value,
                    'referal_code' => $request->referal_code,
                );

                $order = Orders::create($data_order);

                $data_transaction = array(
                    'transaction_code' => $this->code->generate_code_order($value),
                    'order_id' => $order->id,
                );

                $transactions = Transaction::create($data_transaction);
                //Min Quota
                $reservationMenu = ReservationMenu::find($value);
                $reservationMenu->update(['quota'=>($reservationMenu->quota)+1]);

            }
            return redirect()->route('landing')->with('alert', [
                'type' => 'success',
                'message' => 'Pemesanan Makanan Berhasil!',
            ]);
        } else {
            return redirect()->route('landing')->with('alert', [
                'type' => 'error',
                'message' => 'Invalid referral code!',
            ]);
        }
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
