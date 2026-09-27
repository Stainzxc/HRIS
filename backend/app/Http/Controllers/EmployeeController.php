<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeRequest\StoreEmployeeRequest;
use App\Http\Requests\EmployeeRequest\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\EmployeeModel;

class EmployeeController extends Controller
{
    public function export(Request $request)
    {
        $employees = EmployeeModel::query()
            ->with('position.department')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = trim($request->string('search')->toString());
                $query->where(function ($employeeQuery) use ($search) {
                    $employeeQuery->where('employee_number', 'like', "%{$search}%")
                        ->orWhere('first_name', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('employment_status'), fn ($query) => $query->where('employment_status', $request->string('employment_status')->toString()))
            ->when($request->filled('employee_type'), fn ($query) => $query->where('employee_type', $request->string('employee_type')->toString()))
            ->latest()
            ->get();

        return response()->streamDownload(function () use ($employees) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Name', 'Department', 'Email', 'Employment type', 'Status']);
            foreach ($employees as $employee) {
                fputcsv($handle, [
                    trim(implode(' ', array_filter([$employee->first_name, $employee->middle_name, $employee->last_name]))) ?: $employee->employee_number,
                    $employee->position?->department?->name ?? 'Unassigned',
                    $employee->email ?? 'Not provided',
                    str_replace('_', ' ', $employee->employee_type ?? 'Not specified'),
                    ucfirst(str_replace('_', ' ', $employee->employment_status ?? 'Not specified')),
                ]);
            }
            fclose($handle);
        }, 'employees.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    public function index(Request $request)
    {
        $employee = EmployeeModel::query()
            ->with('position.department')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = trim($request->string('search')->toString());

                $query->where(function ($employeeQuery) use ($search) {
                    $employeeQuery
                        ->where('employee_number', 'like', "%{$search}%")
                        ->orWhere('first_name', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhereHas('position', fn ($positionQuery) =>
                            $positionQuery->where('name', 'like', "%{$search}%")
                                ->orWhereHas('department', fn ($departmentQuery) =>
                                    $departmentQuery->where('name', 'like', "%{$search}%")
                                )
                        );
                });
            })
            ->when($request->filled('employment_status'), fn ($query) =>
                $query->where('employment_status', $request->string('employment_status')->toString())
            )
            ->when($request->filled('employee_type'), fn ($query) =>
                $query->where('employee_type', $request->string('employee_type')->toString())
            )
            ->latest()
            ->paginate(min((int) $request->input('per_page', 10), 100))
            ->withQueryString();

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

        $showEmployee->load('position.department');

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
