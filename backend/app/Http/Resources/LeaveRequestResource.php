<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'leave_type' => $this->leave_type,
            'start_date' => $this->start_date?->format('Y-m-d'),
            'end_date' => $this->end_date?->format('Y-m-d'),
            'reason' => $this->reason,
            'status' => $this->status,
            'reviewer_comment' => $this->reviewer_comment,
            'reviewed_at' => $this->reviewed_at,
            'created_at' => $this->created_at,
            'employee' => $this->whenLoaded('employee', fn() => [
                'id' => $this->employee->id,
                'name' => trim("{$this->employee->first_name} {$this->employee->last_name}"),
                'employee_number' => $this->employee->employee_number,
            ]),
        ];
    }
}
