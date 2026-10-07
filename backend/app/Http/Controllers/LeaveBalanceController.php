<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveBalance\StoreLeaveBalanceRequest;
use App\Http\Requests\LeaveBalance\UpdateLeaveBalanceRequest;
use App\Http\Resources\LeaveBalanceResource;
use App\Models\LeaveBalanceModel;
use Illuminate\Http\Request;

class LeaveBalanceController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate(['employee_id' => ['nullable', 'integer', 'exists:employees,id'], 'year' => ['nullable', 'integer', 'min:2000', 'max:2100']]);
        $balances = LeaveBalanceModel::with('employee')->when($validated['employee_id'] ?? null, fn($q, $id) => $q->where('employee_id', $id))->when($validated['year'] ?? null, fn($q, $year) => $q->where('year', $year))->orderBy('employee_id')->orderBy('leave_type')->get();
        return LeaveBalanceResource::collection($balances);
    }

    public function store(StoreLeaveBalanceRequest $request)
    {
        return new LeaveBalanceResource(LeaveBalanceModel::create($request->validated())->load('employee'));
    }
    public function update(UpdateLeaveBalanceRequest $request, LeaveBalanceModel $leaveBalance)
    {
        $leaveBalance->update($request->validated());
        return new LeaveBalanceResource($leaveBalance->refresh()->load('employee'));
    }
    public function destroy(LeaveBalanceModel $leaveBalance)
    {
        $leaveBalance->delete();
        return response()->json(null, 204);
    }
}
