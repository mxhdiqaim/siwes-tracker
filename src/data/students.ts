import type { StudentProgress } from "@/types";
import { MOCK_LOCATIONS } from "@/utils/map-location.ts";

export const mockStudents: StudentProgress[] = [
    {
        id: 1,
        name: "Musa Isa",
        matricNo: "S21/0123",
        site: MOCK_LOCATIONS.SIWES_SITE.name,
        progress: 85,
        status: "On-site",
        gradeStatus: "Pending",
    },
    {
        id: 2,
        name: "Tanimu Ahmed",
        matricNo: "S21/0456",
        site: "NaijaSoft Solutions",
        progress: 60,
        status: "Needs Visit",
        gradeStatus: "Pending",
    },
    {
        id: 3,
        name: "Fatima Bello",
        matricNo: "S21/0789",
        site: "PowerGrid Eng.",
        progress: 40,
        status: "Pending Report",
        gradeStatus: "Completed",
    },
];
