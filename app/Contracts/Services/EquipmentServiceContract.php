<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\DTO\GeoJSON\GeoJsonDTO;

interface EquipmentServiceContract
{
    public function allGeoJsonDataOnly(): GeoJsonDTO;
}
