<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\EquipmentServiceContract;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeoJsonDTO;
use App\Models\Equipment;
use App\Repositories\EquipmentRepository;
use Illuminate\Support\Collection;

final class EquipmentService implements EquipmentServiceContract
{
    public function __construct(
        private readonly EquipmentRepository $equipmentRepository,
    ) {
    }

    final public function allGeoJsonDataOnly(): GeoJsonDTO
    {
        /** @var Collection<Equipment> $equipment */
        $equipment = $this->equipmentRepository->findBy([], ['id', 'nickname', 'longitude', 'latitude']);

        /** @var Collection<FeatureDTO> $features */
        $features = $equipment->map(static function (Equipment $equipment) {
            return $equipment->makeHidden(['id', 'nickname', 'longitude', 'latitude'])->append('feature');
        })
            ->pluck('feature');

        return new GeoJsonDTO($features);
    }
}
