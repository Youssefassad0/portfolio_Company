<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Authentification
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/update-User/{id}', [AuthController::class, 'updateUser']);

// add , delete , update , show Users ---> 

Route::get('/users', [UserController::class, 'listUsers']);
Route::get('/users/{id}', [UserController::class, 'listUser']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
Route::post('/addUser', [UserController::class, 'addUser']);
Route::put('/updateusers/{id}', [UserController::class, 'updateUser']);
// add , delete , update , show Employes  ---> 

Route::delete('/employes/{id}', [EmployeeController::class, 'deleteEmploye']);
Route::get('/employes/{id}', [EmployeeController::class, 'listEmploye']);
Route::get('/employes', [EmployeeController::class, 'listEmployes']);
Route::post('/addEmploye', [EmployeeController::class, 'addEmploye']);
Route::post('/updateemployes/{id}', [EmployeeController::class, 'updateEmploye']);


// add    Category 
Route::post('/addCategory', [CategoryController::class, 'addCategory']);
Route::get('/listCategory', [CategoryController::class, 'listCategory']);
