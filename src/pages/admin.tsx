import { type FC, useMemo, useState } from "react";
import { Box, Typography, useTheme, Grid, Button, Stack } from "@mui/material";
import MapDisplay from "@/components/map-display.tsx";
import { MOCK_LOCATIONS, DUTSE_CENTER, isLocationNear } from "@/utils/map-location";
import CustomCard from "@/components/ui/custom-card.tsx";

// Define the marker structure based on the props accepted by MapDisplay
interface LocationMarker {
    position: { lat: number; lng: number };
    label: string;
    icon?: string;
    color: "success" | "error" | "warning";
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

            <Grid container spacing={3}>
                {/* Map Verification Display */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ height: "70vh", width: "100%", borderRadius: 2, overflow: "hidden" }}>
                        <MapDisplay center={DUTSE_CENTER} markers={mapMarkers} />
                    </Box>
                </Grid>

                {/* Management Controls and Metrics */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <CustomCard>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                            Management Tools
                        </Typography>

                        {/* Status Check */}
                        <Box>
                            <Typography variant="h6">Geo-Verification</Typography>
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

                            <Stack direction="column" spacing={1}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => setSupervisorLocation(MOCK_LOCATIONS.USER_CURRENT)}
                                >
                                    Simulate: At Site
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => setSupervisorLocation(MOCK_LOCATIONS.USER_FAR)}
                                >
                                    Simulate: Away
                                </Button>
                            </Stack>
                        </Box>

                        {/* Bulk Download Feature (Objective Demonstration) */}
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                            Grade Reporting (Objective 5)
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Stack direction="column" spacing={1}>
                                    <Button variant="contained" color="primary">
                                        Download Grades (Excel)
                                    </Button>
                                    <Button variant="outlined" color="primary">
                                        Generate Report (PDF)
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>

                        {/* Inefficient Tracking Demonstration */}
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
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
                    </CustomCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
