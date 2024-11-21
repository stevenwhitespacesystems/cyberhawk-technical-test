<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

use App\Contracts\DTO\PropertiesDTOContract;

final class SitePropertiesDTO implements PropertiesDTOContract
{
    public function __construct(
        public readonly string $id,
        public readonly string $name
    ) {
    }
}
