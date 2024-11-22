import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import { DataTable } from "@/tables/sites/data-table";
import { columns } from "@/tables/sites/columns";
import { useSitesTableData } from "@/hooks/use-sites-table-data";

export const Route = createFileRoute("/_auth/sites")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: tableData } = useSitesTableData();

    console.log(tableData);
    return (
        <>
            <Header />
            <div className="container mx-auto py-0 px-3">
                <DataTable columns={columns} data={tableData?.data ?? []} />
            </div>
        </>
    );
}
