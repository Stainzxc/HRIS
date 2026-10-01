<?php

namespace App\Http\Requests\TaskRequest;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'owner' => ['nullable', 'string', 'max:255'],
            'due_date' => ['nullable', 'date'],
            'priority' => ['required', 'in:High,Medium,Low'],
            'status' => ['required', 'in:To do,In progress,Completed'],
            'description' => ['nullable', 'string'],
        ];
    }
}
