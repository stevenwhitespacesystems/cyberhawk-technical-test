import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import { DataTable } from "@/tables/sites/data-table";
import { columns } from "@/tables/sites/columns";
import { useSitesTableData } from "@/hooks/use-sites-table-data";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export const Route = createFileRoute("/_auth/sites")({
    component: RouteComponent,
});

function RouteComponent() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const { data: tableData } = useSitesTableData({ sorting, columnFilters, pagination });

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
