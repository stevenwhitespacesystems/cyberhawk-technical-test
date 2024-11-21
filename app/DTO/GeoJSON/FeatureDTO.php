<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

use App\Contracts\DTO\PropertiesDTOContract;

final class FeatureDTO
{
    public string $type = 'Feature';

    public function __construct(
        public readonly PropertiesDTOContract $properties,
        public readonly GeometryDTO $geometry,
    ) {
    }
}
