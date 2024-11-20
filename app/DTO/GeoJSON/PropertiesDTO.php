<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

final class PropertiesDTO
{
    public function __construct(
        public readonly string $id,
    ) {
    }
}
