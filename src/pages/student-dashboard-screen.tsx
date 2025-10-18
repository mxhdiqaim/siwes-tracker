import { useMemo, type FC } from "react";
import { Box, Typography, Grid, useTheme, LinearProgress } from "@mui/material";
import AttendanceWidget from "@/components/attendance-widget.tsx";
import MapDisplay from "@/components/map-display";
import CustomCard from "@/components/ui/custom-card.tsx";
import { MOCK_LOCATIONS } from "@/utils/map-location";

// Mock data for student's SIWES progress
const mockStudentData = {
    name: "Musa Garba",
    matricNo: "S21/0123",
    site: MOCK_LOCATIONS.SIWES_SITE.name,
    supervisor: "Aisha Yusuf",
    requiredHours: 480, // Total hours required
    completedHours: 384, // Completed hours
    tasksCompleted: 15,
    tasksTotal: 20,
};

const StudentDashboard: FC = () => {
    const theme = useTheme();

    // Calculate progress percentages
    const hourCompletion = Math.round((mockStudentData.completedHours / mockStudentData.requiredHours) * 100);
    const taskCompletion = Math.round((mockStudentData.tasksCompleted / mockStudentData.tasksTotal) * 100);

    // The student's target SIWES site location
    const targetSite = MOCK_LOCATIONS.SIWES_SITE;

    // Prepare markers for the map: Target SIWES Site
    const mapMarkers = useMemo(() => {
        return [
            {
                position: targetSite,
                label: `Your SIWES Site: ${targetSite.name}`,
            },
            // Show the mock user's current location for self-verification
            {
                position: MOCK_LOCATIONS.USER_CURRENT,
                label: "Your Current Location (Simulated)",
            },
        ];
    }, [targetSite]);

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Welcome, {mockStudentData.name} 👋
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                SIWES Dashboard: Progress Tracking
            </Typography>

            <Grid container spacing={4}>
                {/* SIWES Site Attendance Check (Location-Restricted Attendance) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AttendanceWidget
                        targetLocation="SIWES_SITE" // CRUCIAL: Enforces check-in at the SIWES site
                        userRole="Student"
                    />
                </Grid>

                {/* Progress Tracking Metrics (Dashboard Objective) */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <CustomCard
                        sx={{
                            height: "100%",
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                            SIWES Progress Overview
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Time Commitment ({hourCompletion}%)
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={hourCompletion}
                                    sx={{ height: 10, borderRadius: 5, bgcolor: theme.palette.grey[300] }}
                                    color="primary"
                                />
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    {mockStudentData.completedHours} of {mockStudentData.requiredHours} Hours Completed
                                </Typography>
                            </Grid>

                            <Grid size={12}>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Logbook Completion ({taskCompletion}%)
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={taskCompletion}
                                    sx={{ height: 10, borderRadius: 5, background: theme.palette.grey[300] }}
                                    color="success"
                                />
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    {mockStudentData.tasksCompleted} of {mockStudentData.tasksTotal} Tasks Documented
                                </Typography>
                            </Grid>
                        </Grid>

                        <CustomCard
                            sx={{
                                mt: 3,
                                background: theme.palette.alternate.main,
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight={600}>
                                Site & Supervision Details
                            </Typography>
                            <Box>
                                <Typography component={"span"} variant={"h6"}>
                                    Location:
                                </Typography>{" "}
                                <Typography component={"span"} variant={"h6"} fontWeight={400}>
                                    {mockStudentData.site}
                                </Typography>
                            </Box>{" "}
                            <Box>
                                <Typography component={"span"} variant={"h6"}>
                                    Supervisor:
                                </Typography>{" "}
                                <Typography component={"span"} variant={"h6"} fontWeight={400}>
                                    {mockStudentData.supervisor}
                                </Typography>
                            </Box>
                        </CustomCard>
                    </CustomCard>
                </Grid>

                {/* Map Visualization */}
                <Grid size={12}>
                    <Box sx={{ height: "70vh", width: "100%", borderRadius: 2, overflow: "hidden" }}>
                        <MapDisplay center={targetSite} markers={mapMarkers} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentDashboard;
