<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\EquipmentServiceContract;
use App\DTO\GeoJSON\FeatureDTO;
use App\DTO\GeoJSON\GeoJsonDTO;
use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;
use App\Models\Equipment;
use App\Repositories\EquipmentRepository;
use Illuminate\Cache\Repository as CacheRepository;
use Illuminate\Support\Collection;

final class EquipmentService implements EquipmentServiceContract
{
    public function __construct(
        private readonly EquipmentRepository $equipmentRepository,
        private readonly CacheRepository $cache
    ) {
    }

    final public function allGeoJsonDataOnly(): GeoJsonDTO
    {
        $fields = [
            'id',
            'nickname',
            'longitude',
            'latitude',
            'serial_number',
            'type',
        ];

        /** @var Collection<Equipment> $equipment */
        $equipment = $this->equipmentRepository->findBy([], $fields);

        /** @var Collection<FeatureDTO> $features */
        $features = $equipment->map(static function (Equipment $equipment) use ($fields) {
            return $equipment->makeHidden($fields)->append('feature');
        })
            ->pluck('feature');

        return new GeoJsonDTO($features);
    }

    final public function getTableData(TableRequest $request): TableDataDTO
    {
        $tableService = new TableService($this->equipmentRepository, $this->cache);
        return $tableService->getData($request);
    }
}
