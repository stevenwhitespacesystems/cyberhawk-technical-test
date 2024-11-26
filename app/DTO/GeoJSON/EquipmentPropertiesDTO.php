<?php

declare(strict_types=1);

namespace App\DTO\GeoJSON;

use App\Contracts\DTO\PropertiesDTOContract;
use App\Enums\EquipmentType;

final class EquipmentPropertiesDTO implements PropertiesDTOContract
{
    public function __construct(
        public readonly string $id,
        public readonly string $nickname,
        public readonly string $serialNumber,
        public readonly EquipmentType $type
    ) {
    }
}
