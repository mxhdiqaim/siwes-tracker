import type { UserRole } from "@/types/user-type";
import { useEffect, useState } from "react";

export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const authFlag = localStorage.getItem("isAuthenticated");
                const role = localStorage.getItem("userRole") as UserRole | null;
                setIsAuthenticated(authFlag === "true");
                setUserRole(role);
            } catch (error) {
                console.error("Could not access localStorage", error);
                setIsAuthenticated(false);
                setUserRole(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "isAuthenticated" || event.key === "userRole") {
                checkAuth();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Since this is a simulation, we assume the server is always okay.
    return { isLoading, isAuthenticated, userRole, isServerOk: true };
};
