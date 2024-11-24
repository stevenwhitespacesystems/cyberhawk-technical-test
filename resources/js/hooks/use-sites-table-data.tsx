import { fetchSitesForTable } from "@/api/sites";
import { UseModelTableDataProps, useTableData } from "@/hooks/use-table-data";

export function useSitesTableData({ sorting, columnFilters, pagination }: UseModelTableDataProps) {
    return useTableData({
        queryKey: "sites",
        queryFn: () => fetchSitesForTable({ sorting, columnFilters, pagination }),
        sorting,
        columnFilters,
        pagination,
    });
}
