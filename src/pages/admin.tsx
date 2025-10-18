import { type FC, useMemo, useState } from "react";
import { Box, Typography, Card, CardContent, useTheme, Grid, Button } from "@mui/material";
import MapDisplay from "@/components/map-display.tsx";
import { MOCK_LOCATIONS, ABUJA_CENTER, isLocationNear } from "@/utils/map-location";

// Define the marker structure based on the props accepted by MapDisplay
interface LocationMarker {
    position: { lat: number; lng: number };
    label: string;
    icon?: string;
    color: "success" | "error" | "warning"; // Custom property for visualisation
}

// Mock data structure for reporting metrics
interface SiwesSiteMetric {
    siteName: string;
    supervisor: string;
    status: "Verified" | "Unverified" | "Late";
    lastCheckIn: string;
    isNearCheckIn: boolean;
}

const AdminDashboard: FC = () => {
    const theme = useTheme();

    // State to simulate a switch between nearby and far locations for verification check
    const [supervisorLocation, setSupervisorLocation] = useState(MOCK_LOCATIONS.USER_CURRENT);

    // Mock Metric Data (showing one verified, one unverified)
    const mockMetrics: SiwesSiteMetric[] = useMemo(
        () => [
            {
                siteName: MOCK_LOCATIONS.SIWES_SITE.name,
                supervisor: "Aisha Yusuf",
                status: "Verified",
                lastCheckIn: "10:15 AM",
                isNearCheckIn: isLocationNear(supervisorLocation, MOCK_LOCATIONS.SIWES_SITE),
            },
            {
                siteName: MOCK_LOCATIONS.CLASS_VENUE.name,
                supervisor: "Dr. Chris Obi",
                status: "Late",
                lastCheckIn: "N/A",
                isNearCheckIn: isLocationNear(MOCK_LOCATIONS.USER_FAR, MOCK_LOCATIONS.CLASS_VENUE),
            },
        ],
        [supervisorLocation],
    );

    // Prepare the Markers using the MOCK_LOCATIONS data
    const mapMarkers: LocationMarker[] = useMemo(() => {
        const siteMarker = {
            position: MOCK_LOCATIONS.SIWES_SITE,
            label: `Required: ${MOCK_LOCATIONS.SIWES_SITE.name}`,
            color: "success" as const,
        };

        const supervisorMarker = {
            position: supervisorLocation,
            label: `Supervisor: Location Verified: ${mockMetrics[0].isNearCheckIn ? "YES" : "NO"}`,
            color: mockMetrics[0].isNearCheckIn ? ("success" as const) : ("error" as const),
        };

        return [siteMarker, supervisorMarker];
    }, [mockMetrics, supervisorLocation]);

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: theme.typography.h4.fontWeight,
                    color: theme.palette.text.primary,
                }}
            >
                Centralized Administrator Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                Real-time SIWES Supervisor Verification
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {/* 1. Map Verification Display */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card
                        sx={{
                            borderRadius: theme.borderRadius.large,
                            boxShadow: theme.customShadows.card,
                            height: "550px", // Fixed height for the map container
                            overflow: "hidden",
                        }}
                    >
                        <CardContent sx={{ p: 0, height: "100%", width: "100%" }}>
                            <MapDisplay center={ABUJA_CENTER} markers={mapMarkers} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* 2. Management Controls and Metrics */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        sx={{
                            borderRadius: theme.borderRadius.large,
                            boxShadow: theme.customShadows.card,
                            p: 3,
                            height: "550px",
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                            Management Tools
                        </Typography>

                        {/* Status Check Simulation */}
                        <Box
                            sx={{
                                mb: 3,
                                p: 2,
                                border: 1,
                                borderColor: theme.palette.customColors.border,
                                borderRadius: theme.borderRadius.medium,
                            }}
                        >
                            <Typography variant="h6">Geo-Verification Simulation</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                Current Supervisor Status:
                                <Box
                                    component="span"
                                    sx={{
                                        color: mockMetrics[0].isNearCheckIn
                                            ? theme.palette.success.main
                                            : theme.palette.error.main,
                                        fontWeight: "bold",
                                        ml: 1,
                                    }}
                                >
                                    {mockMetrics[0].isNearCheckIn ? "Verified (Near Site)" : "Unverified (Far Away)"}
                                </Box>
                            </Typography>

                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => setSupervisorLocation(MOCK_LOCATIONS.USER_CURRENT)}
                                sx={{ mr: 1, mt: 1 }}
                            >
                                Simulate: At Site
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => setSupervisorLocation(MOCK_LOCATIONS.USER_FAR)}
                                sx={{ mt: 1 }}
                            >
                                Simulate: Away
                            </Button>
                        </Box>

                        {/* Bulk Download Feature (Objective Demonstration) */}
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Grade Reporting (Objective 5)
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Button fullWidth variant="contained" color="primary">
                                    Download Grades (Excel)
                                </Button>
                            </Grid>
                            <Grid size={6}>
                                <Button fullWidth variant="outlined" color="primary">
                                    Generate Report (PDF)
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Inefficient Tracking Demonstration */}
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Supervisor Check-ins
                        </Typography>
                        {mockMetrics.map((metric) => (
                            <Box
                                key={metric.siteName}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    py: 1,
                                    borderBottom: `1px solid ${theme.palette.customColors.divider}`,
                                }}
                            >
                                <Typography variant="body1">{metric.supervisor}</Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette[metric.status === "Verified" ? "success" : "error"].main,
                                        fontWeight: 600,
                                    }}
                                >
                                    {metric.status}
                                </Typography>
                            </Box>
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
