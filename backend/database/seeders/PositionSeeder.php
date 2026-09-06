<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PositionModel;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PositionModel::create([
            'name' => 'Manager',
            'description' => 'Responsible for overseeing and managing a team or department.',
            'department_id' => 1
        ]);

        PositionModel::create([
            'name' => 'Software Engineer',
            'description' => 'Develops and maintains software applications.',
            'department_id' => 2
        ]);

        PositionModel::create([
            'name' => 'Accountant',
            'description' => 'Manages financial records, prepares reports, and ensures compliance with regulations.',
            'department_id' => 3
        ]);
    }
}
