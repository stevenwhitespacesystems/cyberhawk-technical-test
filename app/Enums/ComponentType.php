<?php

declare(strict_types=1);

namespace App\Enums;

enum ComponentType: string
{
    case BLADE_LEADING_EDGE = 'blade_leading_edge';
    case BLADE_TRAILING_EDGE = 'blade_trailing_edge';
    case BLADE_SURFACE = 'blade_surface';
    case BLADE_TIPS = 'blade_tips';
    case BLADE_LIGHTNING_PROTECTION = 'blade_lightning_protection';
    case BLADE_ROOT = 'blade_root';

    case TOWER_SECTIONS = 'tower_sections';
    case TOWER_SURFACE_COATING = 'tower_surface_coating';
    case TOWER_ACCESS_DOORS = 'tower_access_doors';
    case TOWER_LADDERS = 'tower_ladders';
    case TOWER_CABLE_RUNS = 'tower_cable_runs';

    case NACELLE_CASING = 'nacelle_casing';
    case NACELLE_COOLING_VENTS = 'nacelle_cooling_vents';
    case NACELLE_SENSORS = 'nacelle_sensors';
    case NACELLE_WARNING_LIGHTS = 'nacelle_warning_lights';
    case NACELLE_TOWER_CONNECTION = 'nacelle_tower_connection';

    case HUB_CASING = 'hub_casing';
    case HUB_BLADE_CONNECTIONS = 'hub_blade_connections';
    case HUB_SPINNER_CONE = 'hub_spinner_cone';
    case HUB_PITCH_MECHANISMS = 'hub_pitch_mechanisms';

    case FOUNDATION_BASE_CONNECTION = 'foundation_base_connection';
    case FOUNDATION_CONCRETE = 'foundation_concrete';
    case FOUNDATION_GROUT_LINE = 'foundation_grout_line';
    case FOUNDATION_GROUND_CONDITION = 'foundation_ground_condition';

    case AUXILIARY_TRANSFORMERS = 'auxiliary_transformers';
    case AUXILIARY_CABLE_TRENCHES = 'auxiliary_cable_trenches';
    case AUXILIARY_ACCESS_PLATFORMS = 'auxiliary_access_platforms';
    case AUXILIARY_SAFETY_SIGNAGE = 'auxiliary_safety_signage';
    case AUXILIARY_ANEMOMETER = 'auxiliary_anemometer';

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

    // In the ComponentTypes enum:
    public function label(): string
    {
        $label = match ($this) {
            self::BLADE_LEADING_EDGE => __('component_type.blade_leading_edge'),
            self::BLADE_TRAILING_EDGE => __('component_type.blade_trailing_edge'),
            self::BLADE_SURFACE => __('component_type.blade_surface'),
            self::BLADE_TIPS => __('component_type.blade_tips'),
            self::BLADE_LIGHTNING_PROTECTION => __('component_type.blade_lightning_protection'),
            self::BLADE_ROOT => __('component_type.blade_root'),
        
            self::TOWER_SECTIONS => __('component_type.tower_sections'),
            self::TOWER_SURFACE_COATING => __('component_type.tower_surface_coating'),
            self::TOWER_ACCESS_DOORS => __('component_type.tower_access_doors'),
            self::TOWER_LADDERS => __('component_type.tower_ladders'),
            self::TOWER_CABLE_RUNS => __('component_type.tower_cable_runs'),
        
            self::NACELLE_CASING => __('component_type.nacelle_casing'),
            self::NACELLE_COOLING_VENTS => __('component_type.nacelle_cooling_vents'),
            self::NACELLE_SENSORS => __('component_type.nacelle_sensors'),
            self::NACELLE_WARNING_LIGHTS => __('component_type.nacelle_warning_lights'),
            self::NACELLE_TOWER_CONNECTION => __('component_type.nacelle_tower_connection'),
        
            self::HUB_CASING => __('component_type.hub_casing'),
            self::HUB_BLADE_CONNECTIONS => __('component_type.hub_blade_connections'),
            self::HUB_SPINNER_CONE => __('component_type.hub_spinner_cone'),
            self::HUB_PITCH_MECHANISMS => __('component_type.hub_pitch_mechanisms'),
        
            self::FOUNDATION_BASE_CONNECTION => __('component_type.foundation_base_connection'),
            self::FOUNDATION_CONCRETE => __('component_type.foundation_concrete'),
            self::FOUNDATION_GROUT_LINE => __('component_type.foundation_grout_line'),
            self::FOUNDATION_GROUND_CONDITION => __('component_type.foundation_ground_condition'),
        
            self::AUXILIARY_TRANSFORMERS => __('component_type.auxiliary_transformers'),
            self::AUXILIARY_CABLE_TRENCHES => __('component_type.auxiliary_cable_trenches'),
            self::AUXILIARY_ACCESS_PLATFORMS => __('component_type.auxiliary_access_platforms'),
            self::AUXILIARY_SAFETY_SIGNAGE => __('component_type.auxiliary_safety_signage'),
            self::AUXILIARY_ANEMOMETER => __('component_type.auxiliary_anemometer'),
        };

        return is_string($label) ? $label : '';
    }
}
