<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Transact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransactController extends Controller
{
    public function Payments()
    {
        $payments = Payment::get();
        return response()->json([
            'data' => $payments
        ]);
    }
    public function Transactions()
    {
        $transacts = DB::table('transacts')
            ->join('products', 'transacts.id_product', '=', 'products.id')
            ->join('users', 'transacts.id_user', '=', 'users.id')
            ->join('payments', 'transacts.id_payment', '=', 'payments.id')
            ->select('transacts.id', 'products.name as product_name', 'users.name as user_name', 'transacts.date', 'transacts.Amount', 'payments.name as payment_method', 'transacts.status', 'products.image') // Ajouter la colonne de l'URL de l'image du produit
            ->get();

        return response()->json([
            'data' => $transacts
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'productId' => 'required',
            'userId' => 'required',
            'date' => 'required|date',
            'amount' => 'required|numeric',
            'paymentMethod' => 'required|string',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transaction = new Transact();
        $transaction->id_product = $request->productId;
        $transaction->id_user = $request->userId;
        $transaction->date = $request->date;
        $transaction->Amount = $request->amount;
        $transaction->id_payment = $request->paymentMethod;
        $transaction->status = $request->status;
        $transaction->save();

        return response()->json(['message' => 'Transaction added successfully'], 201);
    }
}
