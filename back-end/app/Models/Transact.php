<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transact extends Model
{
    use HasFactory;
    protected $fillable = ['id_product', 'id_user', 'date', 'id_payment', 'Amount', 'status'];
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
    public function products()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function getProduct()
    {
        return Product::find($this->id_product)->name;
    }
    public function getUser()
    {
        return Product::find($this->id_user)->name;
    }
}
