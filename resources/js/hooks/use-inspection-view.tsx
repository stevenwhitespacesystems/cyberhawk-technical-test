import { fetchInspectionView } from "@/api/inspections";
import { useQuery } from "@tanstack/react-query";

type InspectionViewPayload = {
    dialogOpen: boolean;
    inspectionId: string;
};

export function useInspectionView({ dialogOpen, inspectionId }: InspectionViewPayload) {
    return useQuery({
        queryKey: ["inspection-view", inspectionId],
        queryFn: () => fetchInspectionView({ inspectionId }),
        enabled: dialogOpen,
    });
}
