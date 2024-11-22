import { toast } from "@/hooks/use-toast";
import { columns, Site } from "@/tables/sites/columns";
import axios from "axios";

export async function fetchSitesGeoJson(): Promise<GeoJSON.FeatureCollection> {
    const response = await axios.get("/api/sites/all-geo-json");
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

type TableDataResponse<T> = {
    data: Array<T>;
    meta: {
        page: number;
        pageSize: number;
        total: number;
        pageCount: number;
    };
};

export async function fetchSitesForTable(): Promise<TableDataResponse<Site>> {
    const columnsForTable = columns.map((column) => column.id);
    const response = await axios.post("/api/sites/table-data", {
        columns: columnsForTable,
    });

    if (response.status !== 200) {
        toast({
            variant: "destructive",
            title: "Error",
            description: response.data.data[0],
        });
        throw new Error("Failed to fetch sites for table.");
    }

    return response.data.data.table_data;
}
