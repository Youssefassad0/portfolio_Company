<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        if (!$user) {
            return response()->json([
                'message' => 'User Not Found'
            ]);
        };
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
            'telephone' => 'nullable|numeric|max:10',
            'addresse' => 'nullable|string',
            'country' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $path = 'uploads/users';
            $file->move($path, $fileName);

            // Set image path
            $imagePath = $path . '/' . $fileName;
        }

        // Create new user instance
        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->address = $request->input('address');
        $user->country = $request->input('country');
        $user->password = Hash::make($request->input('password'));
        $user->image = $imagePath; // Assign image path
        $user->save();

        // Return user object with image path in the response
        return response()->json(['user' => $user], 200);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|string|min:4',
            'telephone' => 'nullable|numeric|max:10|min:8',
            'addresse' => 'nullable|string',
            'country' => 'nullable|string',
            'role' => 'nullable|string',
            'image' => 'nullable|mimes:png,jpeg,jpg,webp',
            'urlLinkedin' => 'nullable|string',
            'urlTwitter' => 'nullable|string',
            'urlWebsite' => 'nullable|string',
        ]);

        $user->update($validatedData);

        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
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
    public function getEmploye($id)
    {
        $employe = Employe::find($id);
        return response()->json([
            'employe' => $employe
        ]);
    }
}
