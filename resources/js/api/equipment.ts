import { toast } from "@/hooks/use-toast";
import axios from "axios";

export async function fetchEquipmentGeoJson(): Promise<GeoJSON.FeatureCollection> {
    const response = await axios.get("/api/equipment/all-geo-json");
    if (response.status !== 200) {
        toast({
            variant: "destructive",
            title: "Error",
            description: response.data.data[0],
        });
        throw new Error("Failed to GeoJson data.");
    }

    return response.data.data.geo_json;
}
