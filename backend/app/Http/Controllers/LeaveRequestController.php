<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveRequest\StoreLeaveRequestRequest;
use App\Http\Requests\LeaveRequest\UpdateLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequestModel;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate(['page' => ['sometimes', 'integer', 'min:1'], 'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'], 'status' => ['nullable', 'in:Pending,Approved,Rejected'], 'search' => ['nullable', 'string', 'max:255']]);
        $items = LeaveRequestModel::with('employee')->when(filled($validated['status'] ?? null), fn($q) => $q->where('status', $validated['status']))
            ->when(filled($validated['search'] ?? null), fn($q) => $q->whereHas('employee', fn($eq) => $eq->where('first_name', 'like', '%' . $validated['search'] . '%')->orWhere('last_name', 'like', '%' . $validated['search'] . '%')))
            ->latest('start_date')->paginate($validated['per_page'] ?? 10)->withQueryString();
        return LeaveRequestResource::collection($items);
    }

    public function store(StoreLeaveRequestRequest $request)
    {
        return new LeaveRequestResource(LeaveRequestModel::create($request->validated())->load('employee'));
    }

    public function show(LeaveRequestModel $leaveRequest)
    {
        return new LeaveRequestResource($leaveRequest->load('employee'));
    }

    public function update(UpdateLeaveRequestRequest $request, LeaveRequestModel $leaveRequest)
    {
        $leaveRequest->update([...$request->validated(), 'reviewed_at' => now()]);
        return new LeaveRequestResource($leaveRequest->refresh()->load('employee'));
    }

    public function destroy(LeaveRequestModel $leaveRequest)
    {
        $leaveRequest->delete();
        return response()->json(null, 204);
    }
}
