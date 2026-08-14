<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DepartmentModel;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DepartmentModel::create([
            'name' => 'Human Resources',
            'description' => 'Handles employee relations, recruitment, and training.',
        ]);

        DepartmentModel::create([
            'name' => 'Finance',
            'description' => 'Manages financial planning, budgeting, and accounting.',
        ]);

        DepartmentModel::create([
            'name' => 'Information Technology',
            'description' => 'Responsible for technology infrastructure and support.',
        ]);
    }
}
