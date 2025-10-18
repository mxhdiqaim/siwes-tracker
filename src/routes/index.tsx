import type { ComponentType, ReactNode } from "react";
import AdminScreen from "../pages/admin.tsx";
import NotFoundScreen from "../pages/404.tsx";
import LoginScreen from "@/pages/login-screen.tsx";
import LecturerDashboard from "@/pages/lecturer-dashboard.tsx";
import SupervisorDashboardScreen from "@/pages/supervisor-dashboard-screen.tsx";
import StudentDashboardScreen from "@/pages/student-dashboard-screen.tsx";

export interface AppRouteType {
    to: string;
    element: ComponentType;
    title?: string;
    icon?: ReactNode;
    useLayout?: boolean;
    authGuard?: boolean;
    hidden?: boolean; // True = Hide from the sidebar, but it accessed through navigation
    children?: AppRouteType[];
}

export const appRoutes: AppRouteType[] = [
    {
        to: "/",
        title: "Admin Dashboard",
        element: AdminScreen,
        icon: "🏠",
    },
    {
        to: "/supervisor",
        title: "Supervisor Dashboard",
        element: SupervisorDashboardScreen,
        icon: "🚀",
    },
    {
        to: "/lecturer",
        title: "Lecturer Dashboard",
        element: LecturerDashboard,
        icon: "🎓",
    },
    {
        to: "/student",
        title: "Student Dashboard",
        element: StudentDashboardScreen,
        icon: "📥",
    },

    // Public Routes
    {
        to: "/login",
        element: LoginScreen,
        useLayout: false,
        authGuard: false,
    },

    // Error Pages
    {
        to: "*",
        title: "notFound",
        element: NotFoundScreen,
        hidden: true,
        useLayout: false,
        authGuard: false,
    },
];
