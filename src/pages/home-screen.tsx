import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "@/hooks/use-auth.ts";
import { appRoutes } from "@/routes";
import PageSkeleton from "@/components/spinner.tsx";

const HomeScreen = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useAuthStatus();

    useEffect(() => {
        if (isLoading) {
            // Wait for authentication status to be determined
            return;
        }

        if (isAuthenticated && user) {
            // Find the first accessible, non-hidden, primary route for the user's role.
            const destinationRoute = appRoutes.find(
                (route) =>
                    !route.hidden &&
                    route.icon && // Assumes primary navigation items have an icon
                    route.roles?.includes(user.role),
            );

            if (destinationRoute) {
                // If a suitable page is found, redirect the user there.
                navigate(destinationRoute.to, { replace: true });
            } else {
                // Fallback for authenticated users with no specific route
                navigate("/login", { replace: true });
            }
        } else {
            // If there's no authenticated user, they must log in.
            navigate("/login", { replace: true });
        }
    }, [user, isAuthenticated, isLoading, navigate]);

    // Render a loading spinner to provide feedback while the redirection logic runs.
    return <PageSkeleton />;
};

export default HomeScreen;
