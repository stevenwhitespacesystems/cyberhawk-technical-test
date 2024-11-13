<?php

namespace App\Enums;

enum InspectionStatus: string
{
    case OK = 'ok';
    case FAILED = 'failed';
    case REQUIRES_INSPECTION = 'requires_inspection';

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
            self::OK => __('inspection_status.ok'),
            self::FAILED => __('inspection_status.failed'),
            self::REQUIRES_INSPECTION => __('inspection_status.requires_inspection'),
        };

        return is_string($label) ? $label : '';
    }
}
