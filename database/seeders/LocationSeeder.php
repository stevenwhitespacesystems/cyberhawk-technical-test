<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $harburnhead = Location::factory()->create([
            'name' => 'Harburnhead Wind Farm',
            'short_identifier' => 'WF-HB',
            'latitude' => 55.8168596,
            'longitude' => -3.565025,
        ]);

        $braesOfDoune = Location::factory()->create([
            'name' => 'Braes of Doune Wind Farm',
            'short_identifier' => 'WF-BoD',
            'latitude' => 56.2827615,
            'longitude' => -4.1053899,
        ]);

        $kirkHill = Location::factory()->create([
            'name' => 'Kirk Hill Wind Farm',
            'short_identifier' => 'WF-KH',
            'latitude' => 55.3099298,
            'longitude' => -4.7415814,
        ]);

        $clyde = Location::factory()->create([
            'name' => 'Clyde Wind Farm',
            'short_identifier' => 'WF-CLY',
            'latitude' => 55.446966,
            'longitude' => -3.6016276,
        ]);

        $raceBank = Location::factory()->create([
            'name' => 'Race Bank Wind Farm',
            'short_identifier' => 'WF-RB',
            'latitude' => 52.5051953,
            'longitude' => -2.5347515,
        ]);
    }
}
