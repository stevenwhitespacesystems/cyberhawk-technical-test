<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

final class FeatureDTO
{
    public string $type = 'Feature';

    public function __construct(
        public readonly PropertiesDTO $properties,
        public readonly GeometryDTO $geometry,
    ) {
    }
}
