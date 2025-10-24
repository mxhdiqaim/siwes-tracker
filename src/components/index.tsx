import { Chip } from "@mui/material";
import { MOCK_LOCATIONS } from "@/utils/map-location.ts";
import type { StudentProgress } from "@/types";

export const mockStudents: StudentProgress[] = [
    {
        name: "Blessing Eze",
        matricNo: "S21/0123",
        site: MOCK_LOCATIONS.SIWES_SITE.name,
        progress: 85,
        status: "On-site",
        gradeStatus: "Pending",
    },
    {
        name: "Chinedu Oki",
        matricNo: "S21/0456",
        site: "NaijaSoft Solutions",
        progress: 60,
        status: "Needs Visit",
        gradeStatus: "Pending",
    },
    {
        name: "Fatima Bello",
        matricNo: "S21/0789",
        site: "PowerGrid Eng.",
        progress: 40,
        status: "Pending Report",
        gradeStatus: "Completed",
    },
];

export const getStatusChip = (status: StudentProgress["status"]) => {
    let color: "success" | "warning" | "error" | "default" = "default";
    if (status === "On-site") color = "success";
    else if (status === "Pending Report") color = "warning";
    else if (status === "Needs Visit") color = "error";

    return <Chip label={status} size="small" color={color} sx={{ fontWeight: 600 }} />;
};
