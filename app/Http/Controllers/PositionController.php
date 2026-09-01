<?php

namespace App\Http\Controllers;

use App\Http\Requests\PositionRequest\StorePositionRequest;
use App\Http\Requests\PositionRequest\UpdatePositionRequest;
use App\Models\PositionModel;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index()
    {
        $position = PositionModel::all();

        return response()->json($position);
    }

    public function store(StorePositionRequest $request)
    {
        $validatedPosition = $request->validated();

        $position = PositionModel::create($validatedPosition);

        return response()->json([
            'data' => $position
        ], 201);
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

        return response()->json($showPosition);
    }

    public function update(UpdatePositionRequest $request, PositionModel $position)
    {
        $position->update($request->validated());

        return response()->json([
            'message' => 'Position Updated Successfully',
            'data' => $position
        ], 200);
    }

    public function destroy(PositionModel $position)
    {
        $position->delete();

        return response()->json([
            'message' => 'Position Deleted Successfully',
            'data' => $position
        ], 200);
    }
}
