import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

type TableDataResponse<T> = {
    data: Array<T>;
    meta: {
        page: number;
        pageSize: number;
        total: number;
        pageCount: number;
    };
};

export type UseModelTableDataProps = {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
};

export type UseTableDataProps<T> = {
    queryKey: string;
    queryFn: () => Promise<TableDataResponse<T>>;
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
};
export function useTableData<T>({
    queryKey,
    queryFn,
    sorting,
    columnFilters,
    pagination,
}: UseTableDataProps<T>) {
    return useQuery({
        queryKey: [queryKey, sorting, columnFilters, pagination],
        queryFn,
        placeholderData: keepPreviousData,
    });
}
