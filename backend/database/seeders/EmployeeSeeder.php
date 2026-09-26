<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EmployeeModel;
use App\Models\PositionModel;
use Faker\Factory as FakerFactory;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = FakerFactory::create();
        $positionIds = PositionModel::query()->pluck('id')->all();

        foreach (range(1, 100) as $number) {
            $firstName = $faker->firstName;
            $lastName = $faker->lastName;

            EmployeeModel::create([
                'employee_number' => sprintf('EMP%03d', $number),
                'first_name' => $firstName,
                'middle_name' => $faker->optional()->firstName,
                'last_name' => $lastName,
                'email' => strtolower("{$firstName}.{$lastName}.{$number}@example.com"),
                'phone_number' => '09' . $faker->numerify('#########'),
                'gender' => $faker->randomElement(['male', 'female']),
                'address' => $faker->address,
                'position_id' => $faker->randomElement($positionIds),
                'employment_status' => $faker->randomElement(['active', 'active', 'active', 'inactive', 'terminated']),
                'employee_type' => $faker->randomElement(['full_time', 'full_time', 'part_time', 'contract']),
                'date_of_birth' => $faker->dateTimeBetween('-60 years', '-20 years')->format('Y-m-d'),
                'date_hired' => $faker->dateTimeBetween('-10 years', 'now')->format('Y-m-d'),
                'salary' => $faker->randomFloat(2, 20000, 150000),
            ]);
        }
    }
}
