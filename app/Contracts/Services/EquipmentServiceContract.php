<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\GeoJSON\GeoJsonDTO;
use App\DTO\Table\TableDataDTO;
use App\Http\Requests\Table\TableRequest;

interface EquipmentServiceContract
{
    public function allGeoJsonDataOnly(): GeoJsonDTO;

    public function getTableData(TableRequest $request): TableDataDTO;
}
