<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveBalanceModel extends Model
{
    protected $table = 'leave_balances';
    protected $fillable = ['employee_id', 'leave_type', 'allocated_days', 'used_days', 'year'];
    protected $casts = ['allocated_days' => 'integer', 'used_days' => 'integer', 'year' => 'integer'];

    public function employee()
    {
        return $this->belongsTo(EmployeeModel::class);
    }
}
