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
            "message" => "Category added with success ! ",
            "data" => $category
        ]);
    }
    public function listCategories()
    {
        $category = Category::all();
        return response()->json([
            "status" => 200,
            "data" => $category
        ]);
    }
    public function listCategory($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                "status" => 200,
                "data" => $category
            ]);
        }
        return response()->json(['error' => 'Catégorie non trouvée'], 404);
    }
    public function edit(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string|max:500',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Catégorie non trouvée'], 404);
        }
        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->save();
        return response()->json([
            'status' => 200,
            "message" => "Category updated with success ! ",
            "data" => $category
        ]);
    }
    public function delete($id)
    {
        Category::find($id)->delete();
        return response()->json([
            "status" => 200,
            "message" => "Category deleted with success"
        ]);
    }
}
