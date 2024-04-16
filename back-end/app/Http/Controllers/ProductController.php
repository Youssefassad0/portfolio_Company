<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    public function products()
    {
        $products = Product::with('category')->get(); // Eager loading the 'category' relationship
        return response()->json([
            'data' => $products
        ]);
    }
    public function AddProduct(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'description' => 'nullable|string|max:400',
                'category_id' => 'required',
                'price' => 'nullable|numeric',
                'stock' => 'nullable|numeric',
                'image' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048'
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $imagePath = null;
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $path = 'uploads/products';
                $file->move($path, $fileName);
                $imagePath = $path . '/' . $fileName;
            }
            $product = new Product;
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->category_id = $request->input('category_id');
            $product->price = $request->input('price');
            $product->stock = $request->input('stock');
            $product->image = $imagePath;
            $product->save();
            return response()->json(['product' => $product, "message" => "added with success ! "], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Handle unexpected errors
        }
    }
}
