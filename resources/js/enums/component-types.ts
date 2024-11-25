import { isNaN } from "lodash";

enum ComponentType {
    // Blade components
    BLADE_LEADING_EDGE = "blade_leading_edge",
    BLADE_TRAILING_EDGE = "blade_trailing_edge",
    BLADE_SURFACE = "blade_surface",
    BLADE_TIPS = "blade_tips",
    BLADE_LIGHTNING_PROTECTION = "blade_lightning_protection",
    BLADE_ROOT = "blade_root",

    // Tower components
    TOWER_SECTIONS = "tower_sections",
    TOWER_SURFACE_COATING = "tower_surface_coating",
    TOWER_ACCESS_DOORS = "tower_access_doors",
    TOWER_LADDERS = "tower_ladders",
    TOWER_CABLE_RUNS = "tower_cable_runs",

    // Nacelle components
    NACELLE_CASING = "nacelle_casing",
    NACELLE_COOLING_VENTS = "nacelle_cooling_vents",
    NACELLE_SENSORS = "nacelle_sensors",
    NACELLE_WARNING_LIGHTS = "nacelle_warning_lights",
    NACELLE_TOWER_CONNECTION = "nacelle_tower_connection",

    // Hub components
    HUB_CASING = "hub_casing",
    HUB_BLADE_CONNECTIONS = "hub_blade_connections",
    HUB_SPINNER_CONE = "hub_spinner_cone",
    HUB_PITCH_MECHANISMS = "hub_pitch_mechanisms",

    // Foundation components
    FOUNDATION_BASE_CONNECTION = "foundation_base_connection",
    FOUNDATION_CONCRETE = "foundation_concrete",
    FOUNDATION_GROUT_LINE = "foundation_grout_line",
    FOUNDATION_GROUND_CONDITION = "foundation_ground_condition",

    // Auxiliary components
    AUXILIARY_TRANSFORMERS = "auxiliary_transformers",
    AUXILIARY_CABLE_TRENCHES = "auxiliary_cable_trenches",
    AUXILIARY_ACCESS_PLATFORMS = "auxiliary_access_platforms",
    AUXILIARY_SAFETY_SIGNAGE = "auxiliary_safety_signage",
    AUXILIARY_ANEMOMETER = "auxiliary_anemometer",
}

class ComponentTypeUtils {
    static values(): string[] {
        return Object.values(ComponentType).filter((value) => typeof value === "string");
    }

    static names(): string[] {
        return Object.keys(ComponentType).filter((key) => isNaN(Number(key)));
    }

    static label(type: ComponentType): string {
        const labelMap = {
            [ComponentType.BLADE_LEADING_EDGE]: "Blade Leading Edge",
            [ComponentType.BLADE_TRAILING_EDGE]: "Blade Trailing Edge",
            [ComponentType.BLADE_SURFACE]: "Blade Surface/Skin",
            [ComponentType.BLADE_TIPS]: "Blade Tips",
            [ComponentType.BLADE_LIGHTNING_PROTECTION]: "Blade Lightning Protection",
            [ComponentType.BLADE_ROOT]: "Blade Root Section",
            [ComponentType.TOWER_SECTIONS]: "Tower Sections/Welds",
            [ComponentType.TOWER_SURFACE_COATING]: "Tower Surface Coating/Paint",
            [ComponentType.TOWER_ACCESS_DOORS]: "Tower Access Doors",
            [ComponentType.TOWER_LADDERS]: "Tower External Ladders",
            [ComponentType.TOWER_CABLE_RUNS]: "Tower Cable Runs",
            [ComponentType.NACELLE_CASING]: "Nacelle Casing/Housing",
            [ComponentType.NACELLE_COOLING_VENTS]: "Nacelle Cooling Vents",
            [ComponentType.NACELLE_SENSORS]: "Nacelle External Sensors",
            [ComponentType.NACELLE_WARNING_LIGHTS]: "Nacelle Warning Lights",
            [ComponentType.NACELLE_TOWER_CONNECTION]: "Nacelle-Tower Connection",
            [ComponentType.HUB_CASING]: "Hub Casing",
            [ComponentType.HUB_BLADE_CONNECTIONS]: "Hub Blade Connections",
            [ComponentType.HUB_SPINNER_CONE]: "Hub Spinner Cone",
            [ComponentType.HUB_PITCH_MECHANISMS]: "Hub Pitch Mechanisms",
            [ComponentType.FOUNDATION_BASE_CONNECTION]: "Foundation Base Connection",
            [ComponentType.FOUNDATION_CONCRETE]: "Foundation Concrete Structure",
            [ComponentType.FOUNDATION_GROUT_LINE]: "Foundation Grout Line",
            [ComponentType.FOUNDATION_GROUND_CONDITION]: "Foundation Ground Condition",
            [ComponentType.AUXILIARY_TRANSFORMERS]: "External Transformers",
            [ComponentType.AUXILIARY_CABLE_TRENCHES]: "Cable Trenches",
            [ComponentType.AUXILIARY_ACCESS_PLATFORMS]: "Access Platforms",
            [ComponentType.AUXILIARY_SAFETY_SIGNAGE]: "Safety Signage",
            [ComponentType.AUXILIARY_ANEMOMETER]: "Anemometer/Wind Vanes",
        };

        return labelMap[type] ?? "";
    }
}

export { ComponentType, ComponentTypeUtils };

export default ComponentType;
