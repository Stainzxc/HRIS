<?php

namespace App\Http\Requests\LeaveBalance;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeaveBalanceRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'allocated_days' => ['required', 'integer', 'min:0'],
            'used_days' => ['required', 'integer', 'min:0'],
        ];
    }
}
