<?php

namespace App\Http\Controllers;

use App\Models\Transact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactController extends Controller
{
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
}
