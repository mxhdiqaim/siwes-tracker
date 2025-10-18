import type { ComponentType, ReactNode } from "react";
import HomeScreen from "../pages/home.tsx";
import NotFoundScreen from "../pages/404.tsx";

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
        title: "Dashboard",
        element: HomeScreen,
        icon: "🏠",
    },
    {
        to: "/send",
        title: "Send",
        element: HomeScreen,
        icon: "🚀",
    },
    {
        to: "/receive",
        title: "Receive",
        element: HomeScreen,
        icon: "📥",
    },
    {
        to: "/transactions",
        title: "Transactions",
        element: HomeScreen,
        icon: "💸",
    },

    // Public Routes
    // {
    //     to: "/auth",
    //     element: AuthScreen,
    //     useLayout: false,
    //     authGuard: false,
    // },

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
