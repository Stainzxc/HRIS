<?php

namespace App\Http\Requests\TaskRequest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'owner' => ['sometimes', 'nullable', 'string', 'max:255'],
            'due_date' => ['sometimes', 'nullable', 'date'],
            'priority' => ['sometimes', 'required', 'in:High,Medium,Low'],
            'status' => ['sometimes', 'required', 'in:To do,In progress,Completed'],
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
