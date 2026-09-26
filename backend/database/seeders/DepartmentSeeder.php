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
        $departments = [
            ['Human Resources', 'Handles employee relations, recruitment, and training.'],
            ['Finance', 'Manages financial planning, budgeting, and accounting.'],
            ['Information Technology', 'Responsible for technology infrastructure and support.'],
            ['Operations', 'Improves daily processes and organizational efficiency.'],
            ['Marketing', 'Manages brand, campaigns, and customer communications.'],
            ['Sales', 'Builds customer relationships and drives revenue growth.'],
            ['Legal', 'Provides legal guidance and manages compliance.'],
            ['Customer Support', 'Helps customers resolve questions and issues.'],
            ['Research and Development', 'Creates and improves products and services.'],
            ['Procurement', 'Manages vendors, purchasing, and supplier relationships.'],
            ['Quality Assurance', 'Maintains product and process quality standards.'],
            ['Administration', 'Provides general administrative and office support.'],
        ];

        foreach ($departments as [$name, $description]) {
            DepartmentModel::create(compact('name', 'description'));
        }
    }
}
