<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transact extends Model
{
    use HasFactory;
    protected $fillable = ['id_product', 'id_user', 'date', 'Amount', 'status'];
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
    public function products()
    {
        return $this->belongsTo(Product::class);
    }
    public function users()
    {
        return $this->hasMany(User::class);
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
