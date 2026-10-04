<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequestModel extends Model
{
    protected $table = 'leave_requests';
    protected $fillable = ['employee_id', 'leave_type', 'start_date', 'end_date', 'reason', 'status', 'reviewer_comment', 'reviewed_at'];
    protected $casts = ['start_date' => 'date:Y-m-d', 'end_date' => 'date:Y-m-d', 'reviewed_at' => 'datetime'];

    public function employee()
    {
        return $this->belongsTo(EmployeeModel::class);
    }
}
