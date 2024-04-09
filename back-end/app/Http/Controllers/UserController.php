<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function listUsers()
    {
        $users = User::all();
        return response()->json([
            'users' => $users
        ], 200);
    }
    public function listUser($id)
    {
        $user = User::find($id);
        return response()->json([
            'user' => $user
        ]);
    }
    public function addUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string',
            'password' => 'required|min:4',
            'image' => 'nullable|mimes:png,jpg,jpeg,webp',
            'phone' => 'nullable|numeric|max:10',
            'adresse' => 'nullable|max:10',
            'country' => 'nullable',
        ]);
    }
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès'], 200);
    }









    public function listEmployes()
    {
        $employes = Employe::all();
        return response()->json([
            'employes' => $employes
        ], 200);
    }

    public function deleteEmploye($id)
    {
        $employe = Employe::findOrFail($id);
        $employe->delete();

        return response()->json(['message' => 'Employée supprimé avec succès'], 200);
    }
}
