<?php

use App\Http\Controllers\AuthController;
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
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/users', [UserController::class, 'listUsers']);
Route::get('/users/{id}', [UserController::class, 'listUser']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
Route::delete('/employes/{id}', [UserController::class, 'deleteEmploye']);
Route::get('/employes', [UserController::class, 'listEmployes']);
