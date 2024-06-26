<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'category_id', 'price', 'stock', 'image'];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function getCategory()
    {
        return Category::find($this->category_id)->name;
    }
}
