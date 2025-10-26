import type { UserType } from "@/types/user-type";
import { useEffect, useState } from "react";

export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const authFlag = localStorage.getItem("isAuthenticated");
                const userString = localStorage.getItem("user");
                const parsedUser: UserType | null = userString ? JSON.parse(userString) : null;

                setIsAuthenticated(authFlag === "true" && !!parsedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Could not access localStorage or parse user data", error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "isAuthenticated" || event.key === "user") {
                checkAuth();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Since this is a simulation, we assume the server is always okay.
    return { isLoading, isAuthenticated, user, isServerOk: true };
};
