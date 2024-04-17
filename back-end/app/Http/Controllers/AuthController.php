<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string',
            'password' => 'required|min:4',
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
        $user->password = Hash::make($request->input('password'));
        $user->image = $imagePath;
        $user->save();

        // Return user object with image path in the response
        return response()->json(['user' => $user], 200);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:4',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        if (Hash::check($request->password, $user->password)) {
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['error' => 'Email or password is incorrect.'], 401);
        }
    }
    public function updateUser(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email,' . $id,
                'name' => 'required|string',
                'telephone' => 'nullable|string|max:14',
                'addresse' => 'nullable|string',
                'country' => 'nullable|string',
                'urlLinkedin' => 'nullable|string',
                'urlTwitter' => 'nullable|string',
                'urlWebsite' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->messages()], 422);
            } else {
                $user = User::find($id);
                if (!$user) {
                    return response()->json(['data' => $user, 'message' => 'User Not Found.'], 404);
                } else {

                    // Handle image upload if provided
                    if ($request->hasFile('image')) {
                        $path = $user->image;
                        if (File::exists($path)) {
                            File::delete($path);
                        }
                        $image = $request->file('image');
                        $imageName = time() . '.' . $image->getClientOriginalExtension();
                        $imagePath = 'uploads/users';
                        $image->move($imagePath, $imageName);
                        $user->image = $imagePath . '/' . $imageName;
                    }

                    // Set user attributes
                    $user->name = $request->input('name');
                    $user->email = $request->input('email');
                    $user->telephone = $request->input('telephone');
                    $user->addresse = $request->input('addresse');
                    $user->country = $request->input('country');
                    $user->urlLinkedin = $request->input('urlLinkedin');
                    $user->urlTwitter = $request->input('urlTwitter');
                    $user->urlWebsite = $request->input('urlWebsite');

                    // Save user to the database
                    $user->update();

                    return response()->json(['data' => $user, 'message' => 'User Updated successfully.'], 200);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
