<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PositionModel extends Model
{
    protected $table = 'positions';

    protected $fillable = [
        'department_id',
        'name',
        'description',
    ];

    public function employees()
    {
        return $this->hasMany(EmployeeModel::class, 'employee_id');
    }

    public function department()
    {
        return $this->belongsTo(DepartmentModel::class, 'department_id');
    }
}
