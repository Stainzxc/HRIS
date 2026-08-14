<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EmployeeModel;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmployeeModel::create([
            'employee_number' => 'EMP001',
            'first_name' => 'John',
            'middle_name' => 'Example',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone_number' => '09123456789',
            'gender' => 'Male',
            'address' => 'Sample Address',
            'position_id' => 1,
            'employment_status' => 'active',
            'employee_type' => 'full_time',
            'salary' => 50000.00,
        ]);

        EmployeeModel::create([
            'employee_number' => 'EMP002',
            'first_name' => 'Jane',
            'middle_name' => 'Example',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'phone_number' => '09987654321',
            'gender' => 'Female',
            'address' => 'Sample Address',
            'position_id' => 2,
            'employment_status' => 'inactive',
            'employee_type' => 'contract',
            'salary' => 50000.00,
        ]);

        EmployeeModel::create([
            'employee_number' => 'EMP003',
            'first_name' => 'Alice',
            'middle_name' => 'Example',
            'last_name' => 'Johnson',
            'email' => 'alice@example.com',
            'phone_number' => '09876543210',
            'gender' => 'Female',
            'address' => 'Sample Address',
            'position_id' => 3,
            'employment_status' => 'terminated',
            'employee_type' => 'part_time',
            'salary' => 50000.00,
        ]);
    }
}
