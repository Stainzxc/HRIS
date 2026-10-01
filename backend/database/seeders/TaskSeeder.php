<?php

namespace Database\Seeders;

use App\Models\TaskModel;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = [
            ['Review onboarding documents', 'People team', '2026-10-02', 'High', 'In progress'],
            ['Schedule quarterly check-ins', 'Samantha Collins', '2026-10-03', 'Medium', 'To do'],
            ['Update benefits information', 'HR Operations', '2026-10-05', 'Low', 'To do'],
            ['Prepare monthly payroll report', 'Finance team', '2026-10-06', 'High', 'Completed'],
            ['Send employee satisfaction survey', 'Alex Johnson', '2026-10-07', 'Medium', 'In progress'],
            ['Review leave requests', 'People team', '2026-10-08', 'Medium', 'To do'],
            ['Update employee handbook', 'HR Operations', '2026-10-09', 'Low', 'To do'],
            ['Prepare new hire welcome kits', 'Samantha Collins', '2026-10-10', 'Medium', 'In progress'],
            ['Audit employee records', 'Alex Johnson', '2026-10-12', 'High', 'To do'],
            ['Publish company newsletter', 'Communications team', '2026-10-13', 'Low', 'Completed'],
            ['Schedule benefits orientation', 'People team', '2026-10-14', 'Medium', 'To do'],
            ['Review payroll deductions', 'Finance team', '2026-10-15', 'High', 'In progress'],
            ['Organize training calendar', 'HR Operations', '2026-10-16', 'Medium', 'To do'],
            ['Collect updated emergency contacts', 'People team', '2026-10-17', 'Low', 'To do'],
            ['Prepare performance review forms', 'Samantha Collins', '2026-10-19', 'High', 'In progress'],
            ['Confirm office access badges', 'Facilities team', '2026-10-20', 'Medium', 'Completed'],
            ['Document recruitment workflow', 'Alex Johnson', '2026-10-21', 'Low', 'To do'],
            ['Review attendance report', 'Finance team', '2026-10-22', 'High', 'To do'],
            ['Plan team building activity', 'People team', '2026-10-23', 'Low', 'In progress'],
            ['Update department contacts', 'HR Operations', '2026-10-24', 'Medium', 'To do'],
            ['Prepare annual compliance checklist', 'Compliance team', '2026-10-26', 'High', 'To do'],
            ['Schedule manager training', 'Samantha Collins', '2026-10-27', 'Medium', 'Completed'],
            ['Review workplace policies', 'People team', '2026-10-28', 'Low', 'To do'],
            ['Finalize recruitment metrics', 'Alex Johnson', '2026-10-29', 'High', 'In progress'],
            ['Archive inactive employee files', 'HR Operations', '2026-10-30', 'Medium', 'To do'],
        ];

        foreach ($tasks as [$title, $owner, $dueDate, $priority, $status]) {
            TaskModel::create([
                'title' => $title,
                'owner' => $owner,
                'due_date' => $dueDate,
                'priority' => $priority,
                'status' => $status,
            ]);
        }
    }
}
