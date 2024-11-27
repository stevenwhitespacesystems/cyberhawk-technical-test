import { isNaN } from "lodash";

enum EquipmentType {
    WIND_TURBINE = "wind_turbine",
    PYLON = "pylon",
    TRANSFORMER_STATION = "transformer_station",
}

class EquipmentTypeUtils {
    static values(): string[] {
        return Object.values(EquipmentType).filter((value) => typeof value === "string");
    }

    static names(): string[] {
        return Object.keys(EquipmentType).filter((key) => isNaN(Number(key)));
    }

    static label(type: EquipmentType): string {
        const labelMap = {
            [EquipmentType.WIND_TURBINE]: "Wind Turbine",
            [EquipmentType.PYLON]: "Pylon",
            [EquipmentType.TRANSFORMER_STATION]: "Transformer Station",
        };

        return labelMap[type] ?? "";
    }
}

export { EquipmentType, EquipmentTypeUtils };
