import type { ComponentType, ReactNode } from "react";
import AdminScreen from "../pages/admin.tsx";
import NotFoundScreen from "../pages/404.tsx";
import LoginScreen from "@/pages/login-screen.tsx";
import LecturerDashboard from "@/pages/lecturer-dashboard.tsx";
import SupervisorDashboardScreen from "@/pages/supervisor-dashboard-screen.tsx";
import StudentDashboardScreen from "@/pages/student-dashboard-screen.tsx";
import LandingScreen from "@/pages/landing-screen.tsx";
import { type UserRole, UserRoleEnum } from "@/types/user-type.ts";
import HomeScreen from "@/pages/home-screen.tsx";
import ViewLecturers from "@/pages/view-lectures.tsx";
import ViewSchedules from "@/pages/view-schedules.tsx";

export interface AppRouteType {
    to: string;
    element: ComponentType;
    title?: string;
    icon?: ReactNode;
    useLayout?: boolean;
    authGuard?: boolean;
    hidden?: boolean; // True = Hide from the sidebar, but it accessed through navigation
    children?: AppRouteType[];
    roles?: UserRole[];
}

export const appRoutes: AppRouteType[] = [
    {
        to: "/",
        title: "Home",
        element: HomeScreen,
        useLayout: false,
        authGuard: false,
    },
    {
        to: "/landing",
        title: "Landing",
        element: LandingScreen,
        useLayout: false,
        authGuard: false,
    },
    {
        to: "/admin",
        title: "Admin Dashboard",
        element: AdminScreen,
        icon: "🏠",
        roles: [UserRoleEnum.ADMIN],
        children: [
            {
                to: "lecturers",
                title: "View Lecturers",
                element: ViewLecturers,
                icon: "👩‍🏫",
                roles: [UserRoleEnum.ADMIN],
                hidden: true,
            },
            {
                to: "schedules",
                title: "View Schedules",
                element: ViewSchedules,
                icon: "📅",
                roles: [UserRoleEnum.ADMIN],
                hidden: true,
            },
        ],
    },
    {
        to: "/supervisor",
        title: "Supervisor Dashboard",
        element: SupervisorDashboardScreen,
        icon: "🚀",
        roles: [UserRoleEnum.ADMIN, UserRoleEnum.SUPERVISOR],
    },
    {
        to: "/lecturer",
        title: "Lecturer Dashboard",
        element: LecturerDashboard,
        icon: "🎓",
        roles: [UserRoleEnum.ADMIN, UserRoleEnum.SUPERVISOR, UserRoleEnum.LECTURER],
    },
    {
        to: "/student",
        title: "Student Dashboard",
        element: StudentDashboardScreen,
        icon: "📥",
        roles: [UserRoleEnum.ADMIN, UserRoleEnum.STUDENT],
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
