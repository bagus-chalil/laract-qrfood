<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RouteController extends Controller
{
    public function index()
    {
        if (Auth::user()->roles[0]['name'] === "Admin") {
            return redirect(url('dashboard'));
        } else {
            return redirect(url('home'));
        }
    }
}
