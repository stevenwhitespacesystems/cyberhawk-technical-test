import { toast } from "@/hooks/use-toast";
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import axios from "axios";

type Props<T> = {
    model: "sites" | "equipment" | "components";
    columns: ColumnDef<T>[];
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
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

export async function fetchDataForTable<T>({
    model,
    columns,
    sorting,
    columnFilters,
    pagination,
}: Props<T>): Promise<TableDataResponse<T>> {
    const columnsForTable = columns
        .filter((column) => column.id !== "actions")
        .map((column) => column.id);
    const params = new URLSearchParams();
    if (sorting.length) {
        params.append("sort", JSON.stringify(sorting));
    }

    if (columnFilters.length) {
        params.append("filters", JSON.stringify(columnFilters));
    }

    if (pagination.pageIndex >= 0) {
        params.append("page", (pagination.pageIndex + 1).toString());
    }

    if (pagination.pageSize) {
        params.append("pageSize", pagination.pageSize.toString());
    }

    const queryParams = params.toString() !== "" ? `?${params.toString()}` : "";
    const response = await axios.post(`/api/${model}/table-data${queryParams}`, {
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
