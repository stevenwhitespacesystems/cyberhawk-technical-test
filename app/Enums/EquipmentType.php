<?php

namespace App\Enums;

enum EquipmentType: string
{
    case WIND_TURBINE = 'wind_turbine';
    case PYLON = 'pylon';
    case TRANSFORMER_STATION = 'transformer_station';

    /**
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * @return array<string>
     */
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public function label(): string
    {
        $label = match ($this) {
            self::WIND_TURBINE => __('equipment_type.wind_turbine'),
            self::PYLON => __('equipment_type.pylon'),
            self::TRANSFORMER_STATION => __('equipment_type.transformer_station'),
        };

        return is_string($label) ? $label : '';
    }
}
