<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InspectedComponent>
 */
class InspectedComponentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $scheduledDate = now()->addDays(rand(-31, 31));

        return [
            'scheduled_date' => $scheduledDate,
            'completed_date' => $scheduledDate,
            'grade' => rand(1, 5),
        ];
    }
}
