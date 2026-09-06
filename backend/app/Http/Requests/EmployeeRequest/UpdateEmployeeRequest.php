<?php

namespace App\Http\Requests\EmployeeRequest;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    // public function authorize(): bool
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employeeId = $this->route('employee');

        return [
            'first_name' => ['sometimes', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'max:255', Rule::unique('employees', 'email')->ignore($employeeId)],
            'phone_number' => ['sometimes', 'regex:/^09[0-9]{9}$/'],
            'gender' => ['sometimes', Rule::in(['male', 'female'])],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['sometimes', 'string', 'max:500'],
            'position_id' => ['sometimes', 'integer', Rule::exists('positions', 'id')],
            'employment_status' => ['sometimes', Rule::in(['active', 'inactive', 'terminated'])],
            'employee_type' => ['sometimes', Rule::in(['full_time', 'part_time', 'contract'])],
            'date_hired' => ['sometimes', 'date'],
            'salary' => ['sometimes', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/']
        ];
    }
}
