<?php
namespace App\Http\Requests\LeaveRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLeaveRequestRequest extends FormRequest
{
    public function rules(): array { return [
        'employee_id' => ['required', 'integer', 'exists:employees,id'], 'leave_type' => ['required', 'string', 'max:100'],
        'start_date' => ['required', 'date'], 'end_date' => ['required', 'date', 'after_or_equal:start_date'],
        'reason' => ['nullable', 'string', 'max:2000'],
    ]; }
}
