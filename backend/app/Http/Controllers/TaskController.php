<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest\StoreTaskRequest;
use App\Http\Requests\TaskRequest\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\TaskModel;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'search' => ['sometimes', 'nullable', 'string', 'max:255'],
            'priority' => ['sometimes', 'nullable', 'in:High,Medium,Low'],
            'status' => ['sometimes', 'nullable', 'in:To do,In progress,Completed'],
        ]);

        $tasks = TaskModel::query()
            ->when(filled($validated['search'] ?? null), function ($query) use ($validated) {
                $search = trim($validated['search']);
                $query->where(fn ($taskQuery) => $taskQuery
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('owner', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%"));
            })
            ->when(filled($validated['priority'] ?? null), fn ($query) => $query->where('priority', $validated['priority']))
            ->when(filled($validated['status'] ?? null), fn ($query) => $query->where('status', $validated['status']))
            ->orderBy('id')
            ->paginate($validated['per_page'] ?? 10)
            ->withQueryString();

        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        return new TaskResource(TaskModel::create($request->validated()));
    }

    public function show(TaskModel $task)
    {
        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, TaskModel $task)
    {
        $task->update($request->validated());
        return new TaskResource($task->refresh());
    }

    public function destroy(TaskModel $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
