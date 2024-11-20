<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

final class GeometryDTO
{
    public function __construct(
        public readonly string $type,
        public readonly array $coordinates,
    ) {
    }
}
