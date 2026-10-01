<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskModel extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'title', 'owner', 'due_date', 'priority', 'status', 'description',
    ];

    protected $casts = [
        'due_date' => 'date:Y-m-d',
    ];
}
