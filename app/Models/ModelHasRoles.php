<?php

namespace App\Models;

use App\Models\Roles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ModelHasRoles extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'model_has_roles';

    public function roles()
    {
        return $this->hasOne(Roles::class,'id','role_id');
    }
}
