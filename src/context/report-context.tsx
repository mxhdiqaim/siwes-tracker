import { createContext, useState, type ReactNode, type FC } from "react";

// Define the structure of a report
export interface Report {
    id: string;
    studentId: string;
    studentName: string;
    reportText: string;
    dateSent: string;
}

// Define the context shape
interface ReportsContextType {
    reports: Report[];
    addReport: (report: Omit<Report, "id" | "dateSent">) => void;
}

// Create the context with a default value
export const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

// Create the provider component
export const ReportsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [reports, setReports] = useState<Report[]>([]);

    const addReport = (report: Omit<Report, "id" | "dateSent">) => {
        const newReport: Report = {
            ...report,
            id: `REP-${Date.now()}`,
            dateSent: new Date().toISOString(),
        };
        setReports((prevReports) => [...prevReports, newReport]);
        alert("Report submitted successfully!");
    };

    return <ReportsContext.Provider value={{ reports, addReport }}>{children}</ReportsContext.Provider>;
};
