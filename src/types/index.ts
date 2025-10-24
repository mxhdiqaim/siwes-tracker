export type DrawerAnchor = "left" | "bottom" | "right" | "top";

export type UserRole = "lecturer" | "student" | "supervisor";

export type Status = "pending" | "success" | "fail";

export interface StudentProgress {
    name: string;
    matricNo: string;
    site: string;
    progress: number; // 0-100
    status: "On-site" | "Pending Report" | "Needs Visit";
    gradeStatus: "Pending" | "Completed";
}
