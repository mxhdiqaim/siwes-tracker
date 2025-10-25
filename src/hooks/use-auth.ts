import { useEffect, useState } from "react";

export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const authFlag = localStorage.getItem("isAuthenticated");
                setIsAuthenticated(authFlag === "true");
            } catch (error) {
                console.error("Could not access localStorage", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "isAuthenticated") {
                checkAuth();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Since this is a simulation, we assume the server is always okay.
    return { isLoading, isAuthenticated, isServerOk: true };
};
