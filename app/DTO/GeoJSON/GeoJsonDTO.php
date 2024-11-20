<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

final class GeoJsonDTO
{
    public function __construct(
        public readonly string $type,
        public readonly PropertiesDTO $properties,
        public readonly GeometryDTO $geometry,
    ) {
    }
}
