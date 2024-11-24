import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { isNaN } from "lodash";
import { ArrowUpDown } from "lucide-react";

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
    // TODO: Create Enum for this
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
        meta: {
            filterVariant: "text",
        },
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
        cell(props) {
            const value = props.getValue();
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
];
