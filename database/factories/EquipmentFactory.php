<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\EquipmentType;
use App\Enums\InspectionStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'serial_number' => $this->faker->unique()->numerify('##########'),
            'nickname' => "{$this->faker->colorName()} {$this->faker->firstNameMale()}",
            'type' => EquipmentType::WIND_TURBINE,
            'status' => InspectionStatus::OK,
            'installation_date' => now()->subDays(rand(1, 365)),
        ];
    }
}
