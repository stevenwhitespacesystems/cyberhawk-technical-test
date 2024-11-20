import { fetchSitesGeoJson } from "@/api/sites";
import { useQuery } from "@tanstack/react-query";

export function useSitesGeojsonData() {
    return useQuery({
        queryKey: ["sites-geojson-data"],
        queryFn: fetchSitesGeoJson,
    });
}
