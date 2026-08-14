<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeModel extends Model
{
    protected $table = 'employees';
    
    protected $fillable = [
        'employee_number',
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'phone_number',
        'gender',
        'address',
        'position_id',
        'employment_status',
        'employee_type',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'date_hired' => 'date',
        'salary' => 'decimal:12,2',
    ];

    public function position()
    {
        return $this->belongsTo(PositionModel::class, 'position_id');
    }
}
