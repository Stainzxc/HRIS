<?php

namespace App\Http\Controllers;

use App\Http\Requests\PositionRequest\StorePositionRequest;
use App\Http\Requests\PositionRequest\UpdatePositionRequest;
use App\Http\Resources\PositionResource;
use App\Models\PositionModel;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'search' => ['sometimes', 'nullable', 'string', 'max:255'],
            'department_id' => ['sometimes', 'nullable', 'integer', 'exists:departments,id'],
        ]);
        $position = PositionModel::query()
            ->with('department')
            ->when(filled($validated['search'] ?? null), function ($query) use ($validated) {
                $search = trim($validated['search']);
                $query->where(function ($positionQuery) use ($search) {
                    $positionQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('department', fn ($departmentQuery) => $departmentQuery->where('name', 'like', "%{$search}%"));
                });
            })
            ->when(!empty($validated['department_id']), fn ($query) => $query->where('department_id', $validated['department_id']))
            ->orderBy('id')
            ->paginate($validated['per_page'] ?? 10)
            ->withQueryString();

        return PositionResource::collection($position);
    }

    public function store(StorePositionRequest $request)
    {
        $validatedPosition = $request->validated();

        $position = PositionModel::create($validatedPosition);

        return new PositionResource($position);
    }

    public function show($position)
    {
        $showPosition = PositionModel::find($position);

        if (!$showPosition) {
            return response()->json([
                'message' => 'Position not found',
                'data' => $showPosition
            ], 404);
        }

        return new PositionResource($showPosition);
    }

    public function update(UpdatePositionRequest $request, PositionModel $position)
    {
        $position->update($request->validated());

        return new PositionResource($position);
    }

    public function destroy(PositionModel $position)
    {
        $position->delete();

        return new PositionResource($position);
    }
}
