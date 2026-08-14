<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Models\DepartmentModel;
use Illuminate\Http\Request;
use Illuminate\Session\Store;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = DepartmentModel::all();

        logger($departments);

        return response()->json($departments);
    }

    public function store(StoreDepartmentRequest $request)
    {
        $validatedData = $request->validated();

        $department = DepartmentModel::create($validatedData);

        return response ()->json([
            'id' => $department->id,
            'name' => $department->name,
            'description' => $department->description,
        ], 201);
    }
}
