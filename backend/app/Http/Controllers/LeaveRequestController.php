<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveRequest\StoreLeaveRequestRequest;
use App\Http\Requests\LeaveRequest\UpdateLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequestModel;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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
        $validated = $request->validated();
        $oldStatus = $leaveRequest->status;
        $newStatus = $validated['status'];

        $updatedRequest = app(DatabaseManager::class)->transaction(function () use ($leaveRequest, $validated, $oldStatus, $newStatus) {
            $days = $leaveRequest->start_date->diffInDays($leaveRequest->end_date) + 1;

            if ($oldStatus !== 'Approved' && $newStatus === 'Approved') {
                $balance = $leaveRequest->employee->leaveBalances()
                    ->where('leave_type', $leaveRequest->leave_type)
                    ->where('year', $leaveRequest->start_date->year)
                    ->lockForUpdate()
                    ->first();

                if (!$balance) {
                    throw ValidationException::withMessages([
                        'status' => 'No leave balance exists for this employee, leave type, and year.',
                    ]);
                }

                if ($balance->allocated_days - $balance->used_days < $days) {
                    throw ValidationException::withMessages([
                        'status' => "Insufficient leave balance. This request needs {$days} day(s).",
                    ]);
                }

                $balance->increment('used_days', $days);
            } elseif ($oldStatus === 'Approved' && $newStatus !== 'Approved') {
                $balance = $leaveRequest->employee->leaveBalances()
                    ->where('leave_type', $leaveRequest->leave_type)
                    ->where('year', $leaveRequest->start_date->year)
                    ->lockForUpdate()
                    ->first();

                if ($balance) {
                    $balance->update(['used_days' => max(0, $balance->used_days - $days)]);
                }
            }

            $leaveRequest->update([...$validated, 'reviewed_at' => now()]);
            return $leaveRequest->refresh();
        });

        return new LeaveRequestResource($updatedRequest->load('employee'));
    }

    public function destroy(LeaveRequestModel $leaveRequest)
    {
        $leaveRequest->delete();
        return response()->json(null, 204);
    }
}
