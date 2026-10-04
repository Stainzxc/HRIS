<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\LeaveRequestController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'signup']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::apiResource('departments', DepartmentController::class);
Route::get('employees/export', [EmployeeController::class, 'export']);
Route::apiResource('employees', EmployeeController::class);
Route::apiResource('positions', PositionController::class);
Route::apiResource('tasks', TaskController::class);
Route::apiResource('leave-requests', LeaveRequestController::class);
