<?php

namespace App\Http\Controllers;

use App\Http\Requests\PositionRequest\StorePositionRequest;
use App\Http\Requests\PositionRequest\UpdatePositionRequest;
use App\Http\Resources\PositionResource;
use App\Models\PositionModel;

class PositionController extends Controller
{
    public function index()
    {
        $position = PositionModel::all();

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
