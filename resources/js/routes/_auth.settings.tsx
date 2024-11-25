import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header, { BreadcrumbItemProp } from "@/components/header";

export const Route = createFileRoute("/_auth/settings")({
    component: RouteComponent,
});

function RouteComponent() {
    const breadcrumbItems: BreadcrumbItemProp[] = [
        {
            label: "Settings",
            href: "/settings",
        },
    ];
    return <Header items={breadcrumbItems} />;
}
