import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import { DataTable } from "@/tables/sites/data-table";
import { columns } from "@/tables/sites/columns";

export const Route = createFileRoute("/_auth/sites")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <Header />
            <div className="container mx-auto py-0 px-3">
                <DataTable columns={columns} data={[]} />
            </div>
        </>
    );
}
