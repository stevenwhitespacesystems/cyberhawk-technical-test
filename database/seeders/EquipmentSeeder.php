<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\EquipmentType;
use App\Enums\InspectionStatus;
use App\Models\Equipment;
use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $locations = Location::all();

        foreach ($locations as $location) {
            Equipment::factory()
                ->for($location)
                ->create([
                    'type' => EquipmentType::WIND_TURBINE,
                    'status' => InspectionStatus::OK,
                    'installation_date' => now()->subDays(rand(1, 365)),
                    'latitude' => 55.8154231564819,
                    'longitude' => -3.546443983731893,
                ]);
        }
    }
}
