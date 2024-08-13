<?php

namespace App\Models;

use App\Models\Transaction;
use App\Models\ReservationMenu;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Orders extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'orders';

    public function transaction()
    {
        return $this->hasOne(Transaction::class,'order_id','id');
    }

    public function reservation_menu()
    {
        return $this->hasOne(ReservationMenu::class,'id','reservation_menu_id');
    }

    public function user()
    {
        return $this->hasOne(User::class,'referal_code','referal_code');
    }
}
