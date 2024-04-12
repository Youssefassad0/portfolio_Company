<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
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
