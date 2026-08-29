<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Http\Requests\DestroyDepartmentRequest;
use App\Models\DepartmentModel;
use Illuminate\Http\Request;
use Illuminate\Session\Store;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = DepartmentModel::all();

        return response()->json($departments);
    }

    public function store(StoreDepartmentRequest $request)
    {
        $validatedData = $request->validated();

        $department = DepartmentModel::create($validatedData);

        return response()->json([
            'id' => $department->id,
            'name' => $department->name,
            'description' => $department->description,
        ], 201);
    }

    public function show($department)
    {
        $showDepartment = DepartmentModel::find($department);

        if (!$showDepartment) {
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }

        return response()->json([
            'data' => $showDepartment
        ], 200);
    }

    public function update(UpdateDepartmentRequest $request, DepartmentModel $department)
    {
        $department->update($request->validated());

        return response()->json([
            'id' => $department->id,
            'name' => $department->name,
            'description' => $department->description
        ], 200);
    }

    public function destroy(DepartmentModel $department)
    {
        $department->delete();

        return response()->json([
            'data' => $department
        ], 200);
    }
}
