<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest\StoreEmployeeRequest;
use App\Http\Requests\EmployeeRequest\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\EmployeeModel;

class EmployeeController extends Controller
{
    public function index()
    {
        $employee = EmployeeModel::all();

        return EmployeeResource::collection($employee);
    }

    public function store(StoreEmployeeRequest $request)
    {
        $validatedEmployee = $request->validated();

        $employee = EmployeeModel::create($validatedEmployee);

        return new EmployeeResource($employee);
    }

    public function show($employee)
    {
        $showEmployee = EmployeeModel::find($employee);

        if (!$showEmployee) {
            return response()->json([
                'message' => 'Employee not found'
            ], 404);
        }

        return new EmployeeResource($showEmployee);
    }

    public function update(UpdateEmployeeRequest $request, EmployeeModel $employee)
    {
        $employee->update($request->validated());

        return new EmployeeResource($employee);
    }

    public function destroy(EmployeeModel $employee)
    {
        $employee->delete();

        return new EmployeeResource($employee);
    }
}
