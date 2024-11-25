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

export default ComponentType;
