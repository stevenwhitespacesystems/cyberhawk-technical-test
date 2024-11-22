import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Site = {
    id: string;
    name: string;
    short_identifier: string;
};

export const columns: ColumnDef<Site>[] = [
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "text",
        },
    },
    {
        id: "short_identifier",
        accessorKey: "short_identifier",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                SID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
];
