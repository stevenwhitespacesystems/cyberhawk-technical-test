import { useState } from "react";
import { useInspectionView } from "@/hooks/use-inspection-view";
import { EquipmentType, EquipmentTypeUtils } from "@/enums/equipment-types";
import { ComponentType, ComponentTypeUtils } from "@/enums/component-types";
import Slider from "@mui/material/Slider";
import getGradeVariant from "@/lib/getGradeVariant";
import { useUpdateInspectedComponentGrade } from "@/hooks/use-update-inspected-component-grade";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

type Props = {
    inspectionId: string;
    children: JSX.Element;
};

const marks = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
];

function InspectionView({ inspectionId, children }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [grades, setGrades] = useState<Record<string, number>>({});
    const {
        data: inspection,
        isLoading,
        isSuccess,
    } = useInspectionView({
        dialogOpen: open,
        inspectionId,
    });

    const { mutate: updateGrade } = useUpdateInspectedComponentGrade(inspectionId);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="min-w-[95%]">
                <DialogHeader>
                    <DialogTitle>Inspection Report</DialogTitle>
                    <DialogDescription>
                        This page shows all the components that have been scheduled to be inspected
                        or have had their inspection already.
                    </DialogDescription>
                </DialogHeader>
                {isLoading && <div>Loading...</div>}
                {isSuccess && (
                    <div className="flex justify-between gap-x-4">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Site</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <dl>
                                        <dt className="text-gray-500 text-sm">Name</dt>
                                        <dd>{inspection.site.name}</dd>
                                    </dl>
                                    <dl className="text-right">
                                        <dt className="text-gray-500 text-sm">SID</dt>
                                        <dd>{inspection.site.short_identifier}</dd>
                                    </dl>
                                </div>
                                <dl>
                                    <dt className="text-gray-500 text-sm">Address</dt>
                                    <dd className="text-sm">{inspection.site.address_comma}</dd>
                                </dl>
                                <div className="flex justify-between">
                                    <dl>
                                        <dt className="text-gray-500 text-sm">Latitude</dt>
                                        <dd>{inspection.site.latitude}</dd>
                                    </dl>
                                    <dl className="text-right">
                                        <dt className="text-gray-500 text-sm">Longitude</dt>
                                        <dd>{inspection.site.longitude}</dd>
                                    </dl>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Equipment</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <dl>
                                        <dt className="text-gray-500 text-sm">Nickname</dt>
                                        <dd>{inspection.equipment.nickname}</dd>
                                    </dl>
                                    <dl className="text-right">
                                        <dt className="text-gray-500 text-sm">Serial Number</dt>
                                        <dd>{inspection.equipment.serial_number}</dd>
                                    </dl>
                                </div>
                                <div className="flex justify-between">
                                    <dl>
                                        <dt className="text-gray-500 text-sm">Type</dt>
                                        <dd>
                                            {EquipmentTypeUtils.label(
                                                inspection.equipment.type as EquipmentType
                                            )}
                                        </dd>
                                    </dl>
                                    <dl className="text-right">
                                        <dt className="text-gray-500 text-sm">Installation</dt>
                                        <dd>
                                            {new Date(
                                                inspection.equipment.installation_date
                                            ).toLocaleDateString()}
                                        </dd>
                                    </dl>
                                </div>
                                <div className="flex justify-between">
                                    <dl>
                                        <dt className="text-gray-500 text-sm">Latitude</dt>
                                        <dd>{inspection.site.latitude}</dd>
                                    </dl>
                                    <dl className="text-right">
                                        <dt className="text-gray-500 text-sm">Longitude</dt>
                                        <dd>{inspection.site.longitude}</dd>
                                    </dl>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Inspection Details</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <dl>
                                        <dt className="text-gray-500 text-sm">Scheduled</dt>
                                        <dd>
                                            {new Date(
                                                inspection.scheduled_date
                                            ).toLocaleDateString()}
                                        </dd>
                                    </dl>
                                    <dl className="text-right">
                                        <dt className="text-gray-500 text-sm">Reference</dt>
                                        <dd>{inspection.reference}</dd>
                                    </dl>
                                </div>
                                <div className="flex justify-between">
                                    <dl>
                                        <dt className="text-gray-500 text-sm">Completed</dt>
                                        <dd>
                                            {new Date(
                                                inspection.completed_date
                                            ).toLocaleDateString()}
                                        </dd>
                                    </dl>
                                    <dl className="text-right">
                                        <dt className="text-gray-500 text-sm">
                                            Avg. Component Grade
                                        </dt>
                                        <dd>
                                            <Badge variant={getGradeVariant(inspection.grade)}>
                                                {inspection.grade}
                                            </Badge>
                                        </dd>
                                    </dl>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle>Inspected Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="w-[100px]">Serial</TableHead>
                                    <TableHead className="w-[100px]">Scheduled</TableHead>
                                    <TableHead className="w-[150px]">Checked By</TableHead>
                                    <TableHead className="w-[100px]">Completed</TableHead>
                                    <TableHead className="w-[450px] text-center">Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inspection?.inspected_components.map((inspectedComponent) => (
                                    <TableRow key={inspectedComponent.id}>
                                        <TableCell className="p-1">
                                            {ComponentTypeUtils.label(
                                                inspectedComponent.component.type as ComponentType
                                            )}
                                        </TableCell>
                                        <TableCell className="p-1">
                                            {inspectedComponent.component.serial_number}
                                        </TableCell>
                                        <TableCell className="p-1">
                                            {new Date(
                                                inspectedComponent.scheduled_date
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="p-1">
                                            {inspectedComponent.user.name}
                                        </TableCell>
                                        <TableCell className="p-1">
                                            {new Date(
                                                inspectedComponent.completed_date
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="py-1 pr-4">
                                            <Slider
                                                color="primary"
                                                min={1}
                                                max={5}
                                                step={1}
                                                valueLabelDisplay="auto"
                                                value={
                                                    grades[inspectedComponent.id] ??
                                                    inspectedComponent.grade
                                                }
                                                marks={marks}
                                                onChange={(_, value) => {
                                                    setGrades({
                                                        ...grades,
                                                        [inspectedComponent.id]: value as number,
                                                    });

                                                    updateGrade({
                                                        id: inspectedComponent.id,
                                                        grade: value as number,
                                                    });
                                                }}
                                                sx={{
                                                    "& .MuiSlider-thumb": {
                                                        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible":
                                                            {
                                                                boxShadow: "none",
                                                            },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

export default InspectionView;
