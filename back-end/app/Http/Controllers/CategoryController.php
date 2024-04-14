<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function addCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string|max:500',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $category = Category::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);
        return response()->json([
            'status' => 201,
            "data" => $category
        ]);
    }
    public function listCategory()
    {
        $category = Category::all();
        return response()->json([
            "status" => 200,
            "data" => $category
        ]);
    }
}
