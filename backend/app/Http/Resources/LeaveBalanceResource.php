<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveBalanceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'leave_type' => $this->leave_type,
            'allocated_days' => $this->allocated_days,
            'used_days' => $this->used_days,
            'remaining_days' => max(0, $this->allocated_days - $this->used_days),
            'year' => $this->year,
            'employee' => $this->whenLoaded('employee', fn() => [
                'id' => $this->employee->id,
                'name' => trim("{$this->employee->first_name} {$this->employee->last_name}"),
                'employee_number' => $this->employee->employee_number,
            ]),
        ];
    }
}
