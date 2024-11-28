import { createLazyFileRoute } from "@tanstack/react-router";
import Header, { BreadcrumbItemProp } from "@/components/header";
import { DataTable } from "@/tables/root/data-table";
import { useState } from "react";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useTableData } from "@/hooks/use-table-data";
import { fetchDataForTable } from "@/api/table";
import { columns } from "@/tables/equipment/columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/_auth/equipment")({
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
        queryKey: "equipment",
        queryFn,
        sorting,
        columnFilters,
        pagination,
    });

    const breadcrumbItems: BreadcrumbItemProp[] = [
        {
            label: "Equipment",
            href: "/equipment",
        },
    ];

    return (
        <>
            <Header items={breadcrumbItems} />
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
                    globalActions={
                        <Button disabled>
                            <Plus />
                            Create
                        </Button>
                    }
                />
            </div>
        </>
    );
}
