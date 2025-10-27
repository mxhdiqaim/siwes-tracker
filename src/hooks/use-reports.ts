import { useContext } from "react";
import { ReportsContext } from "@/context/report-context.tsx";

export const useReports = () => {
    const context = useContext(ReportsContext);
    if (!context) {
        throw new Error("useReports must be used within a ReportsProvider");
    }
    return context;
};
