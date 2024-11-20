<?php

declare(strict_types=1);

namespace App\DTO\Site;

use App\DTO\GeoJSON\GeoJsonDTO;
use Illuminate\Support\Collection;

final class AllGeoJsonDataResponseDTO
{
    /**
     * @param Collection<GeoJsonDTO> $geoJsonData
     */
    public function __construct(
        public readonly Collection $geoJsonData,
    ) {
    }
}
