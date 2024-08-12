<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\OrderFood;
use Illuminate\Http\Request;
use App\Models\ReservationMenu;

class OrderFoodController extends Controller
{
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
        //
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
