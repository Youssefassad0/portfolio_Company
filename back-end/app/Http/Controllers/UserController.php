<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function listUsers()
    {
        $users = User::all();
        return response()->json([
            'users' => $users
        ], 200);
    }
    public function listEmployes()
    {
        $users = Employe::all();
        return response()->json([
            'users' => $users
        ], 200);
    }
}
