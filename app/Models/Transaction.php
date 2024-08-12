<?php

namespace App\Models;

use App\Models\Orders;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'transactions';

    public function order()
    {
        return $this->hasOne(Orders::class,'id','order_id');
    }
}
