<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WorkflowController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\SubDepartmentController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);

    Route::get('/workflow', function (Request $request) {
        return $request->workflow();
    });
    Route::apiResource('/workflows', WorkflowController::class);
    Route::post('/workflow', [WorkflowController::class, 'store']);
    Route::apiResource('/departments', DepartmentController::class);
    Route::post('/department', [DepartmentController::class, 'store']);
    Route::apiResource('/subdepartments', SubDepartmentController::class);
    Route::post('/subdepartment', [SubDepartmentController::class, 'store']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);