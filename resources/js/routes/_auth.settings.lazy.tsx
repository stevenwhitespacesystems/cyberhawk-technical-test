import { createLazyFileRoute } from "@tanstack/react-router";
import Header, { BreadcrumbItemProp } from "@/components/header";

export const Route = createLazyFileRoute("/_auth/settings")({
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
