import InspectionView from "@/components/inspection-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EquipmentType, EquipmentTypeUtils } from "@/enums/equipment-types";
import getGradeVariant from "@/lib/getGradeVariant";
import { ColumnDef } from "@tanstack/react-table";
import { isNaN } from "lodash";
import { ArrowRight, ArrowUpDown } from "lucide-react";

export type Inspection = {
    id: string;
    reference: number;
    scheduled_date: string;
    completed_date: string;
    site: {
        name: string;
    };
    equipment: {
        type: EquipmentType;
        serial_number: string;
    };
};

export const columns: ColumnDef<Inspection>[] = [
    {
        id: "reference",
        accessorKey: "reference",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ref
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        id: "scheduled_date",
        accessorKey: "scheduled_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Scheduled
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
        id: "scheduled_date",
        accessorKey: "scheduled_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Scheduled
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
        id: "equipment.serial_number",
        accessorKey: "equipment.serial_number",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Equipment Serial
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
                Completed
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
                Avg Grade
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            filterVariant: "number",
        },
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            const variant = getGradeVariant(value);

            return (
                <div className="flex justify-center">
                    <Badge variant={variant}>{value}</Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end gap-2">
                <InspectionView inspectionId={row.original.id}>
                    <Button variant="outline">
                        <ArrowRight />
                        View
                    </Button>
                </InspectionView>
            </div>
        ),
    },
];
