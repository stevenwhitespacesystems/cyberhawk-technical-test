import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type UpdateGradePayload = {
    id: string;
    grade: number;
};

async function updateGrade({ id, grade }: UpdateGradePayload) {
    await axios.post("/api/inspected-components/update-grade", {
        id,
        grade,
    });
}

export function useUpdateInspectedComponentGrade(inspectionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateGrade,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["inspection-view", inspectionId],
            });
            queryClient.invalidateQueries({
                queryKey: ["inspections"],
            });
        },
    });
}
