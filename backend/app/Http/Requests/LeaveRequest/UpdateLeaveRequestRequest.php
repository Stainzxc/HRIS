<?php
namespace App\Http\Requests\LeaveRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLeaveRequestRequest extends FormRequest
{
    public function rules(): array { return [
        'status' => ['required', Rule::in(['Approved', 'Rejected', 'Pending'])],
        'reviewer_comment' => ['nullable', 'string', 'max:2000'],
    ]; }
}
