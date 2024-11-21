import { fetchEquipmentGeoJson } from "@/api/equipment";
import { useQuery } from "@tanstack/react-query";

export function useEquipmentGeojsonData() {
    return useQuery({
        queryKey: ["equipment-geojson-data"],
        queryFn: fetchEquipmentGeoJson,
    });
}
