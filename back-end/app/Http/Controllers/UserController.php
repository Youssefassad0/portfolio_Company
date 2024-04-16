<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
            ], 404);
        };
        return response()->json([
            'data' => $user
        ], 200);
    }
    public function addUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email',
                'name' => 'required|string',
                'password' => 'required|min:4',
                'telephone' => 'nullable|string|max:14',
                'image' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
                'addresse' => 'nullable|string',
                'country' => 'nullable|string',
                'urlLinkedin' => 'nullable|string',
                'urlTwitter' => 'nullable|string',
                'urlWebsite' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            } else {
                $user = new User;

                // Handle image upload if provided
                if ($request->hasFile('image')) {
                    $image = $request->file('image');
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $imagePath = 'uploads/users';
                    $image->move($imagePath, $imageName);
                    $user->image = $imagePath . '/' . $imageName;
                }

                // Set user attributes
                $user->name = $request->input('name');
                $user->email = $request->input('email');
                $user->password = Hash::make($request->input('password'));
                $user->telephone = $request->input('telephone');
                $user->addresse = $request->input('addresse');
                $user->country = $request->input('country');
                $user->urlLinkedin = $request->input('urlLinkedin');
                $user->urlTwitter = $request->input('urlTwitter');
                $user->urlWebsite = $request->input('urlWebsite');

                // Save user to the database
                $user->save();

                return response()->json(['data' => $user, 'message' => 'User added successfully.'], 201);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function updateUser(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'addresse' => 'nullable|string',
                'country' => 'nullable|string',
                'telephone' => 'nullable|max:10',
                'password' => 'nullable|min:4',
                'email' => 'required|email|unique:employes,email,' . $id,
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $user = User::findOrFail($id);

            $imagePath = $user->image; // Preserve the existing image path

            if ($request->hasFile('image')) {
                // Delete the existing image if exists
                if ($user->image) {
                    Storage::delete($user->image);
                }

                $file = $request->file('image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $path = 'uploads/employes';
                $file->move($path, $fileName);

                // Set new image path
                $imagePath = $path . '/' . $fileName;
            }

            // Update employee data
            $user->update([
                'name' => $request->input('name'),
                'addresse' => $request->input('addresse'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'country' => $request->input('country'),
            ]);

            return response()->json(['data' => $user, 'message' => 'User updated successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès'], 200);
    }
}
