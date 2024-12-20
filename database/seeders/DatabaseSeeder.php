<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\EquipmentType;
use App\Enums\InspectionStatus;
use App\Models\Component;
use App\Models\Equipment;
use App\Models\InspectedComponent;
use App\Models\Inspection;
use App\Models\Location;
use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(4)->create();
        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $harburnhead = Site::factory()->create([
            'name' => 'Harburnhead Wind Farm',
            'short_identifier' => 'WF-HB',
            'latitude' => 55.8168596,
            'longitude' => -3.565025,
        ]);

        $braesOfDoune = Site::factory()->create([
            'name' => 'Braes of Doune Wind Farm',
            'short_identifier' => 'WF-BoD',
            'latitude' => 56.2827615,
            'longitude' => -4.1053899,
        ]);

        $kirkHill = Site::factory()->create([
            'name' => 'Kirk Hill Wind Farm',
            'short_identifier' => 'WF-KH',
            'latitude' => 55.3099298,
            'longitude' => -4.7415814,
        ]);

        $clyde = Site::factory()->create([
            'name' => 'Clyde Wind Farm',
            'short_identifier' => 'WF-CLY',
            'latitude' => 55.446966,
            'longitude' => -3.6016276,
        ]);

        $donington = Site::factory()->create([
            'name' => 'Donington Wind Farm',
            'short_identifier' => 'WF-Don',
            'latitude' => 52.9259373,
            'longitude' => -0.2270153,
        ]);

        Equipment::factory()
            ->for($harburnhead)
            ->create([
                'latitude' => 55.8154231564819,
                'longitude' => -3.546443983731893,
            ]);

        Equipment::factory()
            ->for($harburnhead)
            ->create([
                'latitude' => 55.821174703307655,
                'longitude' => -3.5517365618665417,
            ]);

        Equipment::factory()
            ->for($harburnhead)
            ->create([
                'latitude' => 55.805183856718436,
                'longitude' => -3.5456470603022985,
            ]);
        
        Equipment::factory()
            ->for($braesOfDoune)
            ->create([
                'latitude' => 56.27837029800838,
                'longitude' => -4.0859859600466315,
            ]);

        Equipment::factory()
            ->for($braesOfDoune)
            ->create([
                'latitude' => 56.25915091924983,
                'longitude' => -4.051153087805943,
            ]);

        Equipment::factory()
            ->for($braesOfDoune)
            ->create([
                'latitude' => 56.27547009920492,
                'longitude' => -4.065977399066483,
            ]);

        Equipment::factory()
            ->for($kirkHill)
            ->create([
                'latitude' => 55.31172415723565,
                'longitude' => -4.742069272974654,
            ]);

        Equipment::factory()
            ->for($kirkHill)
            ->create([
                'latitude' => 55.304759667462235,
                'longitude' => -4.7457749768269775,
            ]);

        Equipment::factory()
            ->for($kirkHill)
            ->create([
                'latitude' => 55.30804386414069,
                'longitude' => -4.732675101495533,
            ]);

        Equipment::factory()
            ->for($clyde)
            ->create([
                'latitude' => 55.447571867863125,
                'longitude' => -3.6264586084213346,
            ]);

        Equipment::factory()
            ->for($clyde)
            ->create([
                'latitude' => 55.43257134357736,
                'longitude' => -3.52641238152178,
            ]);

        Equipment::factory()
            ->for($clyde)
            ->create([
                'latitude' => 55.435407710224496,
                'longitude' => -3.5738174166688874,
            ]);

        Equipment::factory()
            ->for($donington)
            ->create([
                'latitude' => 52.94073125204062,
                'longitude' => -0.22291730724329542,
            ]);

        Equipment::factory()
            ->for($donington)
            ->create([
                'latitude' => 52.92995998402182,
                'longitude' => -0.23223147300771188,
            ]);

        Equipment::factory()
            ->for($donington)
            ->create([
                'latitude' => 52.936852384449075,
                'longitude' => -0.2192910795125103,
            ]);

        $equipment = Equipment::all();
        foreach ($equipment as $asset) {
            Component::factory()
                ->for($asset)
                ->count(rand(5, 20))
                ->create([
                    'site_id' => $asset->site_id,
                ]);

            Inspection::factory()
                ->for($asset)
                ->count(rand(1, 3))
                ->create([
                    'site_id' => $asset->site_id,
                ]);
        }

        $inspections = Inspection::all();
        $users = User::all();
        foreach ($inspections as $inspection) {

            $componentsForInspection = $inspection->equipment->components->random(rand(1, 5));
            foreach ($componentsForInspection as $component) {
                $user = $users->random();
                InspectedComponent::factory()
                    ->for($inspection)
                    ->for($component)
                    ->for($user)
                    ->create();
            }

            $scheduledDate = $inspection->inspectedComponents->sortBy('scheduled_date')->first()->scheduled_date;
            $completedDate = $inspection->inspectedComponents->sortByDesc('completed_date')->first()->completed_date;
            $averageGrade = round($inspection->inspectedComponents->avg('grade'), 1);
            $inspection->update([
                'scheduled_date' => $scheduledDate,
                'completed_date' => $completedDate,
                'grade' => $averageGrade,
            ]);
        }
    }
}
