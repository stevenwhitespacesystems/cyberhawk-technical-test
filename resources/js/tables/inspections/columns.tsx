import InspectionView from "@/components/inspection-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EquipmentType, EquipmentTypeUtils } from "@/enums/equipment-types";
import { ColumnDef } from "@tanstack/react-table";
import { isNaN } from "lodash";
import { ArrowRight, ArrowUpDown } from "lucide-react";

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
        enableColumnFilter: false,
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
        enableColumnFilter: false,
    },
    {
        id: "equipment.type",
        accessorKey: "equipment.type",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Equipment
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
        enableColumnFilter: false,
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
        id: "grade",
        accessorKey: "grade",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Avg Component Grade
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "number",
        },
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            let jsx = null;
            if (value >= 3.5) {
                jsx = <Badge variant="default">{value}</Badge>;
            } else if (value >= 3.0) {
                jsx = <Badge variant="secondary">{value}</Badge>;
            } else {
                jsx = <Badge variant="destructive">{value}</Badge>;
            }
            return <div className="flex justify-center">{jsx}</div>;
        },
    },
    {
        id: "actions",
        cell: () => (
            <div className="flex justify-end gap-2">
                <InspectionView>
                    <Button variant="outline">
                        <ArrowRight />
                        View
                    </Button>
                </InspectionView>
            </div>
        ),
    },
];
