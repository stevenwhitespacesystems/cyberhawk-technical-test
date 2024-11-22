import { fetchSitesForTable } from "@/api/sites";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

type Props = {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
};
export function useSitesTableData({ sorting, columnFilters }: Props) {
    return useQuery({
        queryKey: ["sites-table-data", sorting, columnFilters],
        queryFn: () => fetchSitesForTable({ sorting, columnFilters }),
    });
}
