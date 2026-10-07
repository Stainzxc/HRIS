<?php

namespace App\Http\Requests\LeaveBalance;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeaveBalanceRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'employee_id' => ['required', 'integer', 'exists:employees,id'],
            'leave_type' => ['required', 'string', 'max:100'],
            'allocated_days' => ['required', 'integer', 'min:0'],
            'used_days' => ['sometimes', 'integer', 'min:0'],
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
        ];
    }
}
