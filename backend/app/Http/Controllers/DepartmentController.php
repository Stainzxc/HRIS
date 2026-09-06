<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest\StoreDepartmentRequest;
use App\Http\Requests\DepartmentRequest\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use App\Models\DepartmentModel;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = DepartmentModel::all();

        $departments->load('positions');

        return DepartmentResource::collection($departments);
    }

    public function store(StoreDepartmentRequest $request)
    {
        $validatedData = $request->validated();

        $department = DepartmentModel::create($validatedData);

        return new DepartmentResource($department);
    }

    public function show($department)
    {
        $showDepartment = DepartmentModel::find($department);

        if (!$showDepartment) {
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }

        $showDepartment->load('positions');

        return new DepartmentResource($showDepartment);
    }

    public function update(UpdateDepartmentRequest $request, DepartmentModel $department)
    {
        $department->update($request->validated());

        return new DepartmentResource($department);
    }

    public function destroy(DepartmentModel $department)
    {
        $department->delete();

        return new DepartmentResource($department);
    }
}
