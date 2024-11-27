import { useState } from "react";
import { useInspectionView } from "@/hooks/use-inspection-view";
import { EquipmentType, EquipmentTypeUtils } from "@/enums/equipment-types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

type Props = {
    inspectionId: string;
    children: JSX.Element;
};

function InspectionView({ inspectionId, children }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const {
        data: inspection,
        isLoading,
        isSuccess,
    } = useInspectionView({
        dialogOpen: open,
        inspectionId,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="min-w-[80%]">
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
                                    <dd>{inspection.site.address_comma}</dd>
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
                            <CardContent>Content</CardContent>
                        </Card>
                    </div>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle>Inspected Components</CardTitle>
                    </CardHeader>
                    <CardContent>Content</CardContent>
                </Card>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default InspectionView;
