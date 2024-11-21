import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GeoJsonProperties } from "@types/geojson";

type Props = {
    equipment:
        | GeoJsonProperties
        | {
              id: string;
              nickname: string;
              serialNumber: string;
              status: "ok" | "failed" | "requires_inspection";
              type: "wind_turbine" | "pylon" | "transformer_station";
          };
};

function EquipmentPopup({ equipment }: Props) {
    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Equipment Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div>Nickname: {equipment?.nickname}</div>
                <div>Serial Number: {equipment?.serialNumber}</div>
                <div>Status: {equipment?.status}</div>
                <div>Type: {equipment?.type}</div>
            </CardContent>
        </Card>
    );
}

export default EquipmentPopup;
