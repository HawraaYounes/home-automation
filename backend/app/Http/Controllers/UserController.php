<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(){
        $users=User::all();
        return response()->json($users, 201);
    }
}
