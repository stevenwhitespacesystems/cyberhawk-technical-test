import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import { DataTable } from "@/tables/sites/data-table";
import { columns } from "@/tables/sites/columns";
import { useSitesTableData } from "@/hooks/use-sites-table-data";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export const Route = createFileRoute("/_auth/sites")({
    component: RouteComponent,
});

function RouteComponent() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const { data: tableData } = useSitesTableData({ sorting, columnFilters });

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
                />
            </div>
        </>
    );
}
