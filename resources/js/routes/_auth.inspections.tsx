import { createFileRoute } from "@tanstack/react-router";
import Header, { BreadcrumbItemProp } from "@/components/header";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useTableData } from "@/hooks/use-table-data";
import { fetchDataForTable } from "@/api/table";
import { columns } from "@/tables/inspections/columns";
import { DataTable } from "@/tables/root/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_auth/inspections")({
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
        fetchDataForTable({ model: "inspections", columns, sorting, columnFilters, pagination });
    const { data: tableData } = useTableData({
        queryKey: "inspections",
        queryFn,
        sorting,
        columnFilters,
        pagination,
    });

    const breadcrumbItems: BreadcrumbItemProp[] = [
        {
            label: "Inspections",
            href: "/interactive",
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus />
                                    Create
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Username
                                        </Label>
                                        <Input
                                            id="username"
                                            defaultValue="@peduarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    }
                />
            </div>
        </>
    );
}
