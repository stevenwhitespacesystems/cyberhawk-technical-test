import { isNaN } from "lodash";

enum InspectionStatus {
    OK = "ok",
    FAILED = "failed",
    REQUIRES_INSPECTION = "requires_inspection",
}

class InspectionStatusUtils {
    static values(): string[] {
        return Object.values(InspectionStatus).filter((value) => typeof value === "string");
    }

    static names(): string[] {
        return Object.keys(InspectionStatus).filter((key) => isNaN(Number(key)));
    }

    static label(status: InspectionStatus): string {
        const labelMap = {
            [InspectionStatus.FAILED]: "Failed",
            [InspectionStatus.OK]: "OK",
            [InspectionStatus.REQUIRES_INSPECTION]: "Requires Inspection",
        };

        return labelMap[status] ?? "";
    }

    static badgeConfig(status: InspectionStatus) {
        const badgeConfig: Record<
            InspectionStatus,
            {
                label: string;
                variant: "default" | "destructive" | "outline" | "secondary" | null | undefined;
            }
        > = {
            [InspectionStatus.FAILED]: {
                label: "Failed",
                variant: "destructive",
            },
            [InspectionStatus.OK]: {
                label: "OK",
                variant: "default",
            },
            [InspectionStatus.REQUIRES_INSPECTION]: {
                label: "Overdue",
                variant: "secondary",
            },
        };

        return badgeConfig[status] ?? { label: "", variant: "default" };
    }
}

export { InspectionStatus, InspectionStatusUtils };
