import { useMemo, useState, type FC } from "react";
import { Box, Typography, Grid, useTheme, LinearProgress, TextField, Button } from "@mui/material";
import AttendanceWidget from "@/components/attendance-widget.tsx";
import MapDisplay from "@/components/map-display";
import CustomCard from "@/components/ui/custom-card.tsx";
import { MOCK_LOCATIONS } from "@/utils/map-location";
import { useReports } from "@/hooks/use-reports.ts";

// Mock data for student's SIWES progress
const mockStudentData = {
    id: "S21/0123",
    name: "Musa Garba",
    matricNo: "S21/0123",
    site: MOCK_LOCATIONS.SIWES_SITE.name,
    supervisor: "Aisha Yusuf",
    requiredHours: 480,
    completedHours: 384,
    tasksCompleted: 15,
    tasksTotal: 20,
};

const StudentDashboard: FC = () => {
    const theme = useTheme();
    const { addReport } = useReports();
    const [reportText, setReportText] = useState("");

    const handleSubmitReport = () => {
        if (!reportText.trim()) {
            alert("Report cannot be empty.");
            return;
        }
        addReport({
            studentId: mockStudentData.id,
            studentName: mockStudentData.name,
            reportText,
        });
        setReportText(""); // Clear the text field after submission
    };

    // ... (other calculations and hooks remain the same)
    const hourCompletion = Math.round((mockStudentData.completedHours / mockStudentData.requiredHours) * 100);
    const taskCompletion = Math.round((mockStudentData.tasksCompleted / mockStudentData.tasksTotal) * 100);
    const targetSite = MOCK_LOCATIONS.SIWES_SITE;
    const mapMarkers = useMemo(() => {
        return [
            {
                position: targetSite,
                label: `Your SIWES Site: ${targetSite.name}`,
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
                Welcome, {mockStudentData.name} 👋
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                SIWES Dashboard: Progress Tracking
            </Typography>

            <Grid container spacing={4}>
                {/* ... (Existing Grid items for Attendance, Progress, etc.) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AttendanceWidget targetLocation="SIWES_SITE" userRole="student" />
                </Grid>

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
                                mt: 2,
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

                {/* New Report Submission Section */}
                <Grid size={12}>
                    <CustomCard>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                            Submit Weekly Report
                        </Typography>
                        <TextField
                            label="Enter your report details here"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                        />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmitReport}>
                            Submit Report
                        </Button>
                    </CustomCard>
                </Grid>

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
