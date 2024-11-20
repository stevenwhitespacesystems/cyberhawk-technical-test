<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

use Illuminate\Support\Collection;

final class GeoJsonDTO
{
    public string $type = 'FeatureCollection';

    /**
     * @param Collection<FeatureDTO> $features
     */
    public function __construct(
        public readonly Collection $features,
    ) {
    }
}
