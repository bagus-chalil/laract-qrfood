<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RouteController extends Controller
{
    public function index()
    {
        if (Auth::user()->roles[0]['name'] === "User") {
            return redirect(url('home'));
        } else {
            return redirect(url('dashboard'));
        }
    }
}
