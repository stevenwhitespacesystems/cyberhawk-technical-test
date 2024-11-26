import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EquipmentType, EquipmentTypeUtils } from "@/enums/equipment-types";
import { InspectionStatus, InspectionStatusUtils } from "@/enums/inspection-statuses";
import { ColumnDef } from "@tanstack/react-table";
import { isNaN } from "lodash";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";

export type Equipment = {
    id: string;
    name: string;
    short_identifier: string;
};

export const columns: ColumnDef<Equipment>[] = [
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
        id: "type",
        accessorKey: "type",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ cell }) => {
            const value = cell.getValue() as EquipmentType;
            return EquipmentTypeUtils.label(value);
        },
        enableColumnFilter: false,
    },
    {
        id: "serial_number",
        accessorKey: "serial_number",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Serial Number
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "text",
        },
    },
    {
        id: "nickname",
        accessorKey: "nickname",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nickname
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "text",
        },
    },
    {
        id: "installation_date",
        accessorKey: "installation_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Installed On
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "date",
        },
        cell({ cell }) {
            const value = cell.getValue();
            if (typeof value === "string" || typeof value === "number") {
                const date = new Date(value);
                if (isNaN(date.getTime())) {
                    return ""; // Invalid date
                }
                return date.toLocaleDateString();
            }
            return ""; // Unknown type
        },
    },
    {
        id: "actions",
        cell: () => (
            <div className="flex justify-end gap-2">
                <Button variant="outline">
                    <Pencil />
                    Edit
                </Button>
                <Button variant="destructive">
                    <Trash />
                    Delete
                </Button>
            </div>
        ),
    },
];
