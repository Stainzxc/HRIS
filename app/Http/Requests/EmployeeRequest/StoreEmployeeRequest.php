<?php

namespace App\Http\Requests\EmployeeRequest;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEmployeeRequest extends FormRequest
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
        return [
            'employee_number' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'regex:/^09[0-9]{9}$/'],
            'gender' => ['required', Rule::in(['male', 'female'])],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['required', 'string', 'max:500'],
            'position_id' => ['required', 'integer', Rule::exists('positions', 'id')],
            'employment_status' => ['required', Rule::in(['active', 'inactive', 'terminated'])],
            'employee_type' => ['required', Rule::in(['full_time', 'part_time', 'contract'])],
            'date_hired' => ['required', 'date'],
            'salary' => ['required', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/']
        ];
    }
}
