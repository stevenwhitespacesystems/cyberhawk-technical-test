import { ColumnDef } from "@tanstack/react-table";

export type Site = {
    id: string;
    name: string;
    short_identifier: string;
};

export const columns: ColumnDef<Site>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "short_identifier",
        header: "SID",
    },
];
