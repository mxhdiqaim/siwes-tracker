export const getEnvVariable = (envKey: string) => {
    const value = import.meta.env[envKey];
    if (!value) {
        throw new Error(`${envKey} variable is not set`);
    }

    return value;
};

export interface StudentProgress {
    name: string;
    matricNo: string;
    site: string;
    progress: number; // 0-100
    status: "On-site" | "Pending Report" | "Needs Visit";
    gradeStatus: "Pending" | "Completed";
}
