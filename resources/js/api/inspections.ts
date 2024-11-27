import { ComponentType } from "@/enums/component-types";
import { EquipmentType } from "@/enums/equipment-types";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

type Site = {
    id: string;
    name: string;
    short_identifier: string;
    address_comma: string;
    latitude: number;
    longitude: number;
};

type Equipment = {
    id: string;
    type: EquipmentType;
    serial_number: string;
    nickname: string;
    installation_date: string;
    latitude: number;
    longitude: number;
};

type Component = {
    id: string;
    serial_number: string;
    type: ComponentType;
};

type User = {
    id: string;
    name: string;
};

type InspectedComponent = {
    id: string;
    completed_date: string;
    component: Component;
    grade: number;
    scheduled_date: string;
    user: User;
};

type Inspection = {
    id: string;
    site_id: string;
    equipment_id: string;
    reference: number;
    scheduled_date: string;
    completed_date: string;
    grade: number;
    site: Site;
    equipment: Equipment;
    inspected_components: InspectedComponent[];
};

type InspectionViewPayload = {
    inspectionId: string;
};

export async function fetchInspectionView({
    inspectionId,
}: InspectionViewPayload): Promise<Inspection> {
    const response = await axios.post("/api/inspections/view", { id: inspectionId });
    if (response.status !== 200) {
        toast({
            variant: "destructive",
            title: "Error",
            description: response.data.data[0],
        });
        throw new Error("Failed to Inspection Data.");
    }

    return response.data.data.inspection;
}
