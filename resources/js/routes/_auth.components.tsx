import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";

export const Route = createFileRoute("/_auth/components")({
    component: RouteComponent,
});

function RouteComponent() {
    return <Header />;
}
