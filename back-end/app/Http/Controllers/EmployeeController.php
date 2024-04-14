<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function listEmployes()
    {
        $employes = Employe::all();
        return response()->json([
            'employes' => $employes
        ], 200);
    }
    public function listEmploye($id)
    {
        $employes = Employe::find($id);
        return response()->json([
            'data' => $employes
        ], 200);
    }
    public function deleteEmploye($id)
    {
        $employe = Employe::findOrFail($id);
        $employe->delete();
        return response()->json(['message' => 'Employée supprimé avec succès'], 200);
    }
    public function addEmploye(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string',
                'prenom' => 'required|string', // removed extra comma
                'date_naissance' => 'required|date',
                'addresse' => 'nullable|string',
                'telephone' => 'nullable|string|max:10',
                'email' => 'required|email|unique:employes,email',
                'date_embauche' => 'required|date',
                'salaire' => 'nullable|numeric',
                'image' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $imagePath = null;

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $path = 'uploads/employes';
                $file->move($path, $fileName);

                // Set image path
                $imagePath = $path . '/' . $fileName;
            }

            $employe = new Employe;
            $employe->nom = $request->input('nom');
            $employe->prenom = $request->input('prenom');
            $employe->date_naissance = $request->input('date_naissance');
            $employe->addresse = $request->input('addresse');
            $employe->telephone = $request->input('telephone');
            $employe->email = $request->input('email');
            $employe->date_embauche = $request->input('date_embauche');
            $employe->salaire = $request->input('salaire');
            $employe->image = $imagePath; // Assign image path
            $employe->save();

            return response()->json(['employe' => $employe, "message" => "added with success ! "], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Handle unexpected errors
        }
    }
    public function updateEmploye(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'date_naissance' => 'required|date',
                'addresse' => 'nullable|string',
                'telephone' => 'nullable|string|max:10',
                'email' => 'required|email|unique:employes,email,' . $id,
                'date_embauche' => 'required|date',
                'salaire' => 'nullable|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $employe = Employe::findOrFail($id);

            $imagePath = $employe->image; // Preserve the existing image path

            if ($request->hasFile('image')) {
                // Delete the existing image if exists
                if ($employe->image) {
                    Storage::delete($employe->image);
                }

                $file = $request->file('image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $path = 'uploads/employes';
                $file->move($path, $fileName);

                // Set new image path
                $imagePath = $path . '/' . $fileName;
            }

            // Update employee data
            $employe->update([
                'nom' => $request->input('nom'),
                'prenom' => $request->input('prenom'),
                'date_naissance' => $request->input('date_naissance'),
                'addresse' => $request->input('addresse'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email'),
                'date_embauche' => $request->input('date_embauche'),
                'salaire' => $request->input('salaire'),
                'image' => $imagePath,
            ]);

            return response()->json(['data' => $employe, 'message' => 'Employee updated successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
