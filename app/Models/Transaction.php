<?php

namespace App\Models;

use App\Models\Orders;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class Transaction extends Model
{
    use HasFactory, Searchable;

    protected $guarded = [];
    protected $table = 'transactions';

    public function toSearchableArray(): array
    {
        return [
            'transaction_code' => $this->transaction_code,
        ];
    }

    public function order()
    {
        return $this->hasOne(Orders::class,'id','order_id');
    }
}
