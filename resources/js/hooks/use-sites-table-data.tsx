import { fetchSitesForTable } from "@/api/sites";
import { useQuery } from "@tanstack/react-query";

export function useSitesTableData() {
    return useQuery({
        queryKey: ["sites-table-data"],
        queryFn: fetchSitesForTable,
    });
}
