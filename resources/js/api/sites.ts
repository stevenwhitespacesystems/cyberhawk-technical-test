import { toast } from "@/hooks/use-toast";
import { columns, Site } from "@/tables/sites/columns";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
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

type Props = {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
};
type TableDataResponse<T> = {
    data: Array<T>;
    meta: {
        page: number;
        pageSize: number;
        total: number;
        pageCount: number;
    };
};

export async function fetchSitesForTable({
    sorting,
    columnFilters,
}: Props): Promise<TableDataResponse<Site>> {
    const columnsForTable = columns.map((column) => column.id);
    const params = new URLSearchParams();
    if (sorting.length) {
        params.append("sort", JSON.stringify(sorting));
    }

    if (columnFilters.length) {
        params.append("filters", JSON.stringify(columnFilters));
    }

    const queryParams = params.toString() !== "" ? `?${params.toString()}` : "";
    const response = await axios.post(`/api/sites/table-data${queryParams}`, {
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
