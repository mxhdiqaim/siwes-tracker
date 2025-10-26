import { Chip } from "@mui/material";
import type { StudentProgress } from "@/types";

export const getStatusChip = (status: StudentProgress["status"]) => {
    let color: "success" | "warning" | "error" | "default" = "default";
    if (status === "On-site") color = "success";
    else if (status === "Pending Report") color = "warning";
    else if (status === "Needs Visit") color = "error";

    return <Chip label={status} size="small" color={color} sx={{ fontWeight: 600 }} />;
};
