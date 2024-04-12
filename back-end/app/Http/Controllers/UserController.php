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
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email',
                'name' => 'required|string',
                'password' => 'required|min:4',
                'image' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048', // Adjusted validation for image upload
                'telephone' => 'nullable|string|max:10', // Changed to string as telephone might have formatting
                'addresse' => 'nullable|string', // Corrected field name from 'addresse' to 'address'
                'country' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $imagePath = null;

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $path = 'uploads/users';
                $file->move($path, $fileName);

                // Set image path
                $imagePath = $path . '/' . $fileName;
            }

            // Create new user instance
            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->telephone = $request->input('telephone'); // Changed to 'telephone' to match input name
            $user->addresse = $request->input('addresse'); // Changed to 'address' to match input name
            $user->country = $request->input('country');
            $user->image = $imagePath; // Assign image path
            $user->save();

            // Return user object with image path in the response
            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Handle unexpected errors
        }
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

    public function getEmploye($id)
    {
        $employe = Employe::find($id);
        return response()->json([
            'employe' => $employe
        ]);
    }
}
