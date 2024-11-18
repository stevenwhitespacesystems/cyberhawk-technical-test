import * as React from "react";
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    ListChecks,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react";

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
import { useAuthStore } from "@/state/auth-store";
import { NavTertiary } from "./nav-tertiary";

const data = {
    navMain: [
        {
            title: "Inspections",
            url: "/inspections",
            icon: ListChecks,
            isActive: true,
            items: [
                {
                    title: "Create",
                    url: "/inspections/create",
                },
                {
                    title: "History",
                    url: "/inspections",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Sites",
            url: "#",
            icon: Frame,
        },
        {
            title: "Equipment",
            url: "#",
            icon: PieChart,
        },
        {
            title: "Components",
            url: "#",
            icon: Map,
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
                            <a href="/app">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Send className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Cyberhawk</span>
                                </div>
                            </a>
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
