import { memo, type ReactNode } from "react";

type Props = {
    authGuard: boolean;
    children: ReactNode;
};

const GuardedRoute = memo(({ children }: Props) => {
    return <>{children}</>;
});

export default GuardedRoute;
