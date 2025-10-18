import { useMemo, type FC } from "react";
import { Box, Typography, Grid, useTheme, LinearProgress } from "@mui/material";
import AttendanceWidget from "@/components/attendance-widget.tsx";
import MapDisplay from "@/components/map-display";
import { MOCK_LOCATIONS } from "@/utils/map-location";
import CustomCard from "@/components/ui/custom-card.tsx";

// Mock data for student's SIWES progress
const mockStudentData = {
    name: "Blessing Eze",
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
                Welcome, {mockStudentData.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                SIWES Dashboard: Progress Tracking
            </Typography>

            <Grid container spacing={4}>
                {/* 1. SIWES Site Attendance Check (Participation Objective) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <CustomCard sx={{ borderRadius: theme.borderRadius.large, boxShadow: theme.customShadows.card }}>
                        <AttendanceWidget
                            targetLocation="SIWES_SITE" // The student checks in at their SIWES site
                            userRole="Student"
                        />
                    </CustomCard>
                </Grid>

                {/* 2. Progress Tracking Metrics (Dashboard Objective) */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <CustomCard
                        sx={{
                            borderRadius: theme.borderRadius.large,
                            boxShadow: theme.customShadows.card,
                            p: 3,
                            height: "100%",
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                            Internship Progress
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
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

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Tasks/Logbook Completion ({taskCompletion}%)
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={taskCompletion}
                                    sx={{ height: 10, borderRadius: 5, bgcolor: theme.palette.grey[300] }}
                                    color="success"
                                />
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    {mockStudentData.tasksCompleted} of {mockStudentData.tasksTotal} Tasks Documented
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box
                            sx={{
                                mt: 4,
                                p: 2,
                                bgcolor: theme.palette.alternate.main,
                                borderRadius: theme.borderRadius.medium,
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight={600}>
                                Site & Supervision Details
                            </Typography>
                            <Typography variant="body2">**Site:** {mockStudentData.site}</Typography>
                            <Typography variant="body2">**Supervisor:** {mockStudentData.supervisor}</Typography>
                        </Box>
                    </CustomCard>
                </Grid>

                {/* 3. Map Visualization */}
                <Grid size={12}>
                    <CustomCard
                        sx={{
                            borderRadius: theme.borderRadius.large,
                            boxShadow: theme.customShadows.card,
                            overflow: "hidden",
                            height: "400px",
                        }}
                    >
                        <Box sx={{ p: 0, height: "100%", width: "100%" }}>
                            <MapDisplay
                                center={targetSite} // Center the map on the SIWES site
                                markers={mapMarkers}
                            />
                        </Box>
                    </CustomCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentDashboard;
