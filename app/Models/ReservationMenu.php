<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class ReservationMenu extends Model
{
    use HasFactory, Searchable;

    protected $guarded = [];
    protected $table = 'reservation_menu';

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
