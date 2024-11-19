import * as React from "react";
import { Component, ListChecks, MapPin, Send, Settings2, Tractor } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { NavTertiary } from "./nav-tertiary";

const data = {
    navMain: [
        {
            title: "Inspections",
            url: "/inspections/history",
            icon: ListChecks,
            isActive: true,
            items: [
                {
                    title: "Reports",
                    url: "/inspections/reports",
                },
                {
                    title: "Create",
                    url: "/inspections/create",
                },
                {
                    title: "History",
                    url: "/inspections/history",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Sites",
            url: "/sites",
            icon: MapPin,
        },
        {
            title: "Equipment",
            url: "/equipment",
            icon: Tractor,
        },
        {
            title: "Components",
            url: "/components",
            icon: Component,
        },
    ],
    navTertiary: [
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/app">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Send className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Cyberhawk</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} />
                <NavTertiary items={data.navTertiary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
