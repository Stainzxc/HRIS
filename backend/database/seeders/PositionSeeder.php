<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PositionModel;
use App\Models\DepartmentModel;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            'Manager', 'Specialist', 'Coordinator', 'Analyst', 'Associate',
            'Team Lead', 'Officer', 'Senior Manager', 'Assistant', 'Director',
        ];

        DepartmentModel::query()->each(function ($department) use ($positions) {
            foreach ($positions as $position) {
                PositionModel::create([
                    'name' => $position,
                    'description' => "{$position} in {$department->name}.",
                    'department_id' => $department->id,
                ]);
            }
        });
    }
}
