<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest\StoreEmployeeRequest;
use App\Http\Requests\EmployeeRequest\UpdateEmployeeRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\EmployeeModel;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employee = EmployeeModel::all();

        return response()->json($employee);
    }

    public function store(StoreEmployeeRequest $request)
    {
        $validatedEmployee = $request->validated();

        $employee = EmployeeModel::create($validatedEmployee);

        return response()->json([
            'data' => $employee
        ], 201);
    }

    public function show($employee)
    {
        $showEmployee = EmployeeModel::find($employee);

        if (!$showEmployee) {
            return response()->json([
                'message' => 'Employee not found'
            ], 404);
        }

        return response()->json([
            'data' => $showEmployee
        ], 200);
    }

    public function update(UpdateEmployeeRequest $request, EmployeeModel $employee)
    {
        $employee->update($request->validated());
        
        return response()->json([
            'data' => $employee,
            'message' => 'Employee updated successfully'
        ], 200);
    }
}
