import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InspectionStatus, InspectionStatusUtils } from "@/enums/inspection-statuses";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, ArrowUpDown, Trash } from "lucide-react";

export type Inspection = {
    id: string;
    name: string;
    short_identifier: string;
};

export const columns: ColumnDef<Inspection>[] = [
    {
        id: "scheduled_date",
        accessorKey: "scheduled_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Scheduled Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "date",
        },
    },
    {
        id: "site.name",
        accessorKey: "site.name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Site
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "text",
        },
    },
    {
        id: "equipment.nickname",
        accessorKey: "equipment.nickname",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Equipment
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        id: "equipment.serial_number",
        accessorKey: "equipment.serial_number",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Equipment Serial Number
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ cell }) => {
            const value = cell.getValue() as InspectionStatus;
            const badgeConfig = InspectionStatusUtils.badgeConfig(value);
            return <Badge variant={badgeConfig.variant}>{badgeConfig.label}</Badge>;
        },
        enableColumnFilter: false,
    },
    {
        id: "completed_date",
        accessorKey: "completed_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Completed Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "date",
        },
    },
    {
        id: "actions",
        cell: () => (
            <div className="flex justify-end gap-2">
                <Button variant="outline">
                    <ArrowRight />
                    View
                </Button>
                <Button variant="destructive">
                    <Trash />
                    Delete
                </Button>
            </div>
        ),
    },
];
