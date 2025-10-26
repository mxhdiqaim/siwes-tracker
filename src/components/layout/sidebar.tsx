import Icon from "@/components/ui/icon.tsx";
import { useAuthStatus } from "@/hooks/use-auth.ts";
import useScreenSize from "@/hooks/use-screen-size.ts";
import { appRoutes, type AppRouteType } from "@/routes";
import { UserRoleEnum } from "@/types/user-type.ts";

import {
    Box,
    Button,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    type SxProps,
    type Theme,
    useTheme,
} from "@mui/material";
import { type FC, Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { Props as AppBarProps } from "./appbar";

import CancelSvgIcon from "@/assets/cancel.svg";
import CollapseSvgIcon from "@/assets/collapse.svg";
import { LogoutOutlined } from "@mui/icons-material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

interface Props extends AppBarProps {
    sx?: SxProps<Theme>;
    showDrawer?: boolean;
}

const SideBar: FC<Props> = ({ sx, drawerState, toggleDrawer, showDrawer }) => {
    const theme = useTheme();
    const { user } = useAuthStatus();
    const location = useLocation();
    const navigate = useNavigate();
    const screenSize = useScreenSize();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    // the function to handle both drawer close and menu expands
    const handleItemClick = (route: AppRouteType) => {
        if (showDrawer) return;

        // If the item has children, just toggle its expanded state and do nothing else.
        if (route.children && route.children.length > 0) {
            setExpandedItems((prev) =>
                prev.includes(route.to) ? prev.filter((item) => item !== route.to) : [...prev, route.to],
            );

            return;
        }

        // If the item is a leaf node and the drawer is open, close it.
        if (toggleDrawer) {
            toggleDrawer(!drawerState);
        }
    };

    const filterRoutes = (routes: AppRouteType[]): AppRouteType[] => {
        return routes
            .filter((route) => {
                // Hide routes that are explicitly hidden, don't use the layout, or are not for authenticated users
                if (route.hidden || !(route.authGuard ?? true) || !(route.useLayout ?? true)) {
                    return false;
                }

                // If the user is not logged in, don't show any authenticated routes
                if (!user?.role) {
                    return false;
                }

                // Admins can see all routes that are part of the layout
                if (user.role === UserRoleEnum.ADMIN) {
                    return true;
                }

                // For other roles, check if their role is included in the route's role array
                if (route.roles) {
                    return route.roles.includes(user.role);
                }

                // If a route has no specific roles defined, it's visible to all authenticated users (except admin handled above)
                return true;
            })
            .map((route) => {
                if (route.children) {
                    const filteredChildren = filterRoutes(route.children);
                    if (filteredChildren.length > 0) {
                        return { ...route, children: filteredChildren };
                    }
                    // Hide parent if no children are visible, unless it's a link itself
                    return { ...route, children: [] };
                }
                return route;
            })
            .filter(
                (route) => !route.children || route.children.length > 0 || (route.element && !route.children?.length),
            );
    };

    const handleSignOut = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
            setIsLoggingOut(false);
            navigate("/login");
        }, 500);
    };

    const renderMenuItem = (route: AppRouteType, index: number, level: number = 0, parentPath: string = "") => {
        const fullPath = parentPath + route.to;

        const isActive = location.pathname.startsWith(fullPath);
        const isSelected = location.pathname === fullPath;
        const isExpanded = expandedItems.includes(route.to);
        const hasChildren = route.children && route.children.length > 0;

        // Resolve dynamic title
        const title = route.title;

        const linkProps = !hasChildren ? { component: Link, to: fullPath } : {};

        return (
            <Fragment key={index}>
                <ListItem disablePadding sx={{ px: 2, py: 0.5 }}>
                    <ListItemButton
                        selected={isSelected}
                        onClick={() => handleItemClick(route)}
                        {...linkProps}
                        sx={{
                            borderRadius: level > 0 ? 2 : theme.borderRadius.small,
                            height: level > 0 ? 38 : "auto",
                            py: 1,
                            px: 2,
                            color: theme.palette.text.secondary,
                            transition: theme.transitions.create(["background-color", "color"], {
                                duration: theme.transitions.duration.short,
                            }),

                            ...(isExpanded && {
                                color: theme.palette.text.primary,
                                border: `0.5px solid ${theme.palette.alternate.dark}`,
                                backgroundColor: theme.palette.background.default,
                            }),

                            "&.Mui-selected": {
                                color: theme.palette.text.primary,
                                border: `0.5px solid ${theme.palette.alternate.dark}`,
                                backgroundColor: theme.palette.background.default,
                                "&:hover": {
                                    backgroundColor: theme.palette.background.default,
                                },
                            },

                            // Hover styles for non-selected items
                            "&:hover": {
                                backgroundColor: theme.palette.background.default,
                                color: isActive ? theme.palette.text.primary : "inherit",
                            },
                        }}
                    >
                        {route?.icon && (
                            <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>{route.icon}</ListItemIcon>
                        )}
                        <ListItemText
                            primary={title}
                            slotProps={{
                                primary: {
                                    variant: "body2",
                                    sx: {
                                        color: isSelected ? theme.palette.text.primary : "inherit",
                                    },
                                },
                            }}
                        />
                        {hasChildren && (
                            <Box
                                component={isExpanded ? ExpandLessOutlinedIcon : ExpandMoreOutlinedIcon}
                                sx={{
                                    fontSize: 20,
                                    color: theme.palette.text.secondary,
                                }}
                            ></Box>
                        )}
                    </ListItemButton>
                </ListItem>

                {/* Render children if expanded */}
                {hasChildren && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {route.children?.map((childRoute, childIndex) =>
                                renderMenuItem(childRoute, childIndex, level + 1, fullPath + "/"),
                            )}
                        </List>
                    </Collapse>
                )}
            </Fragment>
        );
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: { xs: "100vw", md: `${theme.layout.sidebarWidth}px` },
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: { xs: "100vw", md: `${theme.layout.sidebarWidth}px` },
                    background: theme.palette.background.paper,
                },
                position: { xs: "absolute", md: "relative" },
                zIndex: 10,
                ...sx,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                    py: 2,
                    mx: "auto",
                    height: theme.layout.appBarHeight,
                    borderBottom: "1px solid #CFD1D3",
                }}
            >
                <IconButton aria-label={"SITR"} component={Link} to={"/"} sx={{ borderRadius: 1 }}>
                    <Icon src={"/images/bilfi_logo_big.svg"} alt={"SITR"} sx={{ width: "100%", height: "100%" }} />
                </IconButton>
                {screenSize === "mobile" || screenSize === "tablet" ? (
                    <IconButton
                        aria-label="menu"
                        sx={{ borderRadius: 1 }}
                        onClick={() => toggleDrawer && toggleDrawer(!drawerState)}
                    >
                        <Icon src={CancelSvgIcon} alt={"Cancel Icon"} />
                    </IconButton>
                ) : (
                    <IconButton aria-label="menu" sx={{ borderRadius: 1 }}>
                        <Icon src={CollapseSvgIcon} alt={"Collapse Icon"} />
                    </IconButton>
                )}
            </Box>
            <List sx={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
                {/* Routes rendering */}
                <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 3 }}>
                    {filterRoutes(appRoutes).map((route, index) => renderMenuItem(route, index))}
                </Box>

                <Box position={"absolute"} bottom={0} width={"100%"} p={2}>
                    <Button
                        fullWidth
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                        variant="contained"
                        startIcon={<LogoutOutlined />}
                        sx={{
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.error.contrastText,
                            justifyContent: "flex-start",
                            py: 1.5,
                            px: 2,
                            boxShadow: theme.customShadows.button,
                            transition: theme.transitions.create(["background-color", "transform"], {
                                duration: theme.transitions.duration.short,
                            }),
                            "&:hover": {
                                // Darken the button on hover for clear visual feedback
                                backgroundColor: theme.palette.error.dark,
                                // Add a subtle scale effect for a modern feel
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                </Box>
            </List>
        </Drawer>
    );
};

export default SideBar;
