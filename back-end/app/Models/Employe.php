<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom', 'prenom', 'date_naissance', 'addresse', 'telephone', 'email', 'date_embauche', 'salaire', 'photo'
    ];
}
