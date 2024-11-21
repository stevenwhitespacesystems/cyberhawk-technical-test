<?php

namespace Tests\Feature\Equipment;

use App\Contracts\Services\EquipmentServiceContract;
use App\DTO\GeoJSON\EquipmentPropertiesDTO;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeoJsonDTO;
use App\DTO\GeoJSON\GeometryDTO;
use App\Enums\EquipmentType;
use App\Enums\InspectionStatus;
use App\Models\Equipment;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class AllGeoJsonTest extends TestCase
{
    public function test_route_is_authenticated(): void
    {
        $response = $this->getJson('/api/equipment/all-geo-json');

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_successful_mock(): void
    {
        $id = Str::ulid();

        $equipment = new Equipment();
        $equipment->id = $id;
        $equipment->nickname = 'test';
        $equipment->serial_number = 'test';
        $equipment->status = InspectionStatus::OK;
        $equipment->type = EquipmentType::WIND_TURBINE;
        $equipment->longitude = 1.0;
        $equipment->latitude = 1.0;

        $featureDto = new FeatureDTO(
            properties: new EquipmentPropertiesDTO(
                $equipment->id,
                $equipment->nickname,
                $equipment->serial_number,
                $equipment->status,
                $equipment->type
            ),
            geometry: new GeometryDTO(
                type: 'Point',
                coordinates: [
                    $equipment->longitude,
                    $equipment->latitude,
                ]
            )
        );

        $geoJsonDto = new GeoJsonDTO(
            features: collect()->add($featureDto)
        );

        $this->mock(EquipmentServiceContract::class, function ($mock) use ($geoJsonDto) {
            $mock->shouldReceive('allGeoJsonDataOnly')
                ->once()
                ->andReturn($geoJsonDto);
        });

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/equipment/all-geo-json');

        $response->assertStatus(Response::HTTP_OK);
        $jsonResponse = json_decode($response->getContent(), true);
        
        $this->assertEquals($id, $jsonResponse['data']['geo_json']['features'][0]['properties']['id']);
        $this->assertEquals(1.0, $jsonResponse['data']['geo_json']['features'][0]['geometry']['coordinates'][0]);
        $this->assertEquals(1.0, $jsonResponse['data']['geo_json']['features'][0]['geometry']['coordinates'][1]);
    }
}
