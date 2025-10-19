import { useMemo, type FC } from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MapDisplay from "@/components/map-display.tsx";
import AttendanceWidget from "@/components/attendance-widget.tsx";
import CustomCard from "@/components/ui/custom-card.tsx";
import { MOCK_LOCATIONS, DUTSE_CENTER } from "@/utils/map-location";
import { mockStudents } from "@/components";
import TableDataView from "@/components/table-data-view.tsx";

const SupervisorDashboard: FC = () => {
    const theme = useTheme();

    // The supervisor's target visit location (using the mock SIWES Site)
    const targetSite = MOCK_LOCATIONS.SIWES_SITE;

    // Prepare markers for the map: Target Site vs. User's Current (Simulated) Location
    const mapMarkers = useMemo(() => {
        return [
            {
                position: targetSite,
                label: `Target SIWES Site: ${targetSite.name}`,
            },
            {
                position: MOCK_LOCATIONS.USER_CURRENT,
                label: "Your Current Location (Simulated)",
            },
        ];
    }, [targetSite]);

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Supervisor Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                Field Verification, Student Monitoring, and Grading
            </Typography>

            <Grid container spacing={4}>
                {/* Supervisor Check-in Widget (Operational Oversight - Verification) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AttendanceWidget
                        targetLocation="SIWES_SITE" // The supervisor must check in at the SIWES site
                        userRole="supervisor"
                    />
                </Grid>

                {/* Map Verification Display (Real-time Verification Objective) */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <CustomCard>
                        <Box
                            sx={{
                                borderRadius: 3,
                                height: "500px",
                                overflow: "hidden",
                            }}
                        >
                            <MapDisplay center={DUTSE_CENTER} markers={mapMarkers} />
                        </Box>
                        <Box
                            sx={{
                                p: 1.5,
                                background: theme.palette.alternate.main,
                                borderTop: `1px solid ${theme.palette.customColors.divider}`,
                            }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                <CheckCircleIcon
                                    sx={{
                                        verticalAlign: "middle",
                                        fontSize: 16,
                                        color: theme.palette.success.main,
                                        mr: 0.5,
                                    }}
                                />
                                Map shows your location (simulated) relative to the **required SIWES site** for physical
                                presence verification.
                            </Typography>
                        </Box>
                    </CustomCard>
                </Grid>

                {/* Student Progress Tracking & Grading (People Management/Reporting) */}
                <Grid size={12}>
                    <TableDataView mockStudents={mockStudents} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SupervisorDashboard;
