import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import { DataTable } from "@/tables/root/data-table";
import { useState } from "react";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useTableData } from "@/hooks/use-table-data";
import { fetchDataForTable } from "@/api/table";
import { columns } from "@/tables/equipment/columns";

export const Route = createFileRoute("/_auth/equipment")({
    component: RouteComponent,
});

function RouteComponent() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const queryFn = () =>
        fetchDataForTable({ model: "equipment", columns, sorting, columnFilters, pagination });
    const { data: tableData } = useTableData({
        queryKey: "sites",
        queryFn,
        sorting,
        columnFilters,
        pagination,
    });

    return (
        <>
            <Header />
            <div className="container mx-auto py-0 px-3">
                <DataTable
                    columns={columns}
                    data={tableData?.data ?? []}
                    sorting={sorting}
                    setSorting={setSorting}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    pagination={{
                        pageIndex: (tableData?.meta.page ?? pagination.pageIndex) - 1,
                        pageSize: tableData?.meta.pageSize ?? pagination.pageSize,
                    }}
                    setPagination={setPagination}
                    rowCount={tableData?.meta.total}
                />
            </div>
        </>
    );
}
