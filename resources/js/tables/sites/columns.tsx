import { ColumnDef } from "@tanstack/react-table";

export type Site = {
    id: string;
    name: string;
    short_identifier: string;
};

export const columns: ColumnDef<Site>[] = [
    {
        id: "name",
        header: "Name",
        accessorKey: "name",
    },
    {
        id: "short_identifier",
        header: "SID",
        accessorKey: "short_identifier",
    },
];
