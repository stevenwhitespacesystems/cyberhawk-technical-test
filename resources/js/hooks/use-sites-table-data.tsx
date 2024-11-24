import { fetchSitesForTable } from "@/api/sites";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

type Props = {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
};
export function useSitesTableData({ sorting, columnFilters, pagination }: Props) {
    return useQuery({
        queryKey: ["sites-table-data", sorting, columnFilters, pagination],
        queryFn: () => fetchSitesForTable({ sorting, columnFilters, pagination }),
        placeholderData: keepPreviousData,
    });
}
