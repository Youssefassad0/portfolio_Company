<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
    public function delete($id)
    {
        $product = Product::find($id)->delete();
        return response()->json([
            'data' => $product,
            "message" => "deleted with success!"
        ]);
    }
    public function show($id)
    {
        $product = Product::find($id);
        return response()->json([
            'data' => $product
        ]);
    }

    public function updateProduct(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'description' => 'nullable|string|max:300',
                'category_id' => 'nullable|numeric',
                'price' => 'nullable|numeric',
                'stock' => 'nullable|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->messages()], 422);
            } else {
                $product = Product::find($id);
                if (!$product) {
                    return response()->json(['data' => $product, 'message' => 'Product Not Found.'], 404);
                } else {
                    if ($request->hasFile('image')) {
                        $path = $product->image;
                        if (File::exists($path)) {
                            File::delete($path);
                        }
                        $image = $request->file('image');
                        $imageName = time() . '.' . $image->getClientOriginalExtension();
                        $imagePath = 'uploads/users';
                        $image->move($imagePath, $imageName);
                        $product->image = $imagePath . '/' . $imageName;
                    }

                    // Set user attributes
                    $product->name = $request->input('name');
                    $product->description = $request->input('description');
                    $product->category_id = $request->input('category_id');
                    $product->price = $request->input('price');
                    $product->stock = $request->input('stock');
                    $product->update();

                    return response()->json(['data' => $product, 'message' => 'Product Updated successfully.'], 200);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
