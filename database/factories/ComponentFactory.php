<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ComponentType;
use App\Enums\InspectionStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Component>
 */
class ComponentFactory extends Factory
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
            'nickname' => $this->faker->unique()->word(),
            'type' => $this->faker->randomElement(ComponentType::values()),
            'status' => InspectionStatus::OK,
            'specifications' => $this->faker->sentence(),
        ];
    }
}
