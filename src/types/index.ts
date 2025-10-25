/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

// Base schema type that all other schemas will extend
export const baseSchema = yup.object().shape({
    id: yup.string().uuid().required(), // uuid string
    createdAt: yup.string().required(), // ISO date
    lastModified: yup.string().required(), // ISO date
});

// Type inference from the base schema
export type BaseSchema = yup.InferType<typeof baseSchema>;

// Helper types to extend base schema
export type ExtendSchema<T> = BaseSchema & T;

// Function to extend base schema
export const extendBaseSchema = <T extends yup.AnyObject>(fields: T): yup.ObjectSchema<any> => {
    return yup.object({
        baseSchema,
        ...fields,
    });
};

export const searchSchema = yup.object({
    search: yup.string().required("Search term is required").min(2),
});

export type SearchTermType = yup.InferType<typeof searchSchema>;

export type DrawerAnchor = "left" | "bottom" | "right" | "top";

export type UserRole = "lecturer" | "student" | "supervisor";

export type Status = "pending" | "success" | "fail";

export interface StudentProgress {
    id: number;
    name: string;
    matricNo: string;
    site: string;
    progress: number; // 0-100
    status: "On-site" | "Pending Report" | "Needs Visit";
    gradeStatus: "Pending" | "Completed";
}
