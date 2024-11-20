import { toast } from "@/hooks/use-toast";
import axios from "axios";

type FetchSitesGeoJsonResponse = {
    success: boolean;
    data: {
        geo_json: GeoJSON.FeatureCollection;
    };
};

export async function fetchSitesGeoJson(): Promise<FetchSitesGeoJsonResponse> {
    const response = await axios.get("/api/sites/all-geo-json");
    if (response.status !== 200) {
        toast({
            variant: "destructive",
            title: "Error",
            description: response.data.data[0],
        });
        throw new Error("Failed to GeoJson data.");
    }

    return response.data;
}
