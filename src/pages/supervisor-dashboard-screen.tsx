import { useMemo, type FC } from "react";
import { Box, Typography, Grid, useTheme, List, ListItem, ListItemText, Chip, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MapDisplay from "@/components/map-display.tsx";
import AttendanceWidget from "@/components/attendance-widget.tsx";
import CustomCard from "@/components/ui/custom-card.tsx";
import { MOCK_LOCATIONS, DUTSE_CENTER } from "@/utils/map-location";

// Mock data structure for assigned SIWES students
interface StudentProgress {
    name: string;
    matricNo: string;
    site: string;
    progress: number; // 0-100
    status: "On-site" | "Pending Report" | "Needs Visit";
    gradeStatus: "Pending" | "Completed";
}

const mockStudents: StudentProgress[] = [
    {
        name: "Blessing Eze",
        matricNo: "S21/0123",
        site: MOCK_LOCATIONS.SIWES_SITE.name,
        progress: 85,
        status: "On-site",
        gradeStatus: "Pending",
    },
    {
        name: "Chinedu Oki",
        matricNo: "S21/0456",
        site: "NaijaSoft Solutions",
        progress: 60,
        status: "Needs Visit",
        gradeStatus: "Pending",
    },
    {
        name: "Fatima Bello",
        matricNo: "S21/0789",
        site: "PowerGrid Eng.",
        progress: 40,
        status: "Pending Report",
        gradeStatus: "Completed",
    },
];

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

    // Helper to get chip style based on student status
    const getStatusChip = (status: StudentProgress["status"]) => {
        let color: "success" | "warning" | "error" | "default" = "default";
        if (status === "On-site") color = "success";
        else if (status === "Pending Report") color = "warning";
        else if (status === "Needs Visit") color = "error";

        return <Chip label={status} size="small" color={color} sx={{ fontWeight: 600 }} />;
    };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Supervisor Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                Field Verification, Student Monitoring, and Grading
            </Typography>

            <Grid container spacing={4}>
                {/* 1. Supervisor Check-in Widget (Operational Oversight - Verification) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AttendanceWidget
                        targetLocation="SIWES_SITE" // The supervisor must check in at the SIWES site
                        userRole="Supervisor"
                    />
                </Grid>

                {/* 2. Map Verification Display (Real-time Verification Objective) */}
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

                {/* 3. Student Progress Tracking & Grading (People Management/Reporting) */}
                <Grid size={12}>
                    <CustomCard>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Assigned SIWES Students ({mockStudents.length})
                        </Typography>
                        <List>
                            {/* Header Row */}
                            <ListItem
                                sx={{
                                    background: theme.palette.customColors.tableHeader,
                                    borderRadius: theme.borderRadius.small,
                                    fontWeight: "bold",
                                }}
                            >
                                <Grid container>
                                    <Grid size={3}>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Name/Matric
                                        </Typography>
                                    </Grid>
                                    <Grid size={3}>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Site
                                        </Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Activity Status
                                        </Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Grade Status
                                        </Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Action
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            {/* Student Data Rows */}
                            {mockStudents.map((student) => (
                                <ListItem key={student.matricNo} divider>
                                    <Grid container alignItems="center">
                                        <Grid size={3}>
                                            <ListItemText
                                                primary={student.name}
                                                secondary={student.matricNo}
                                                primaryTypographyProps={{ variant: "body1", fontWeight: 600 }}
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography variant="body2">{student.site}</Typography>
                                        </Grid>
                                        <Grid size={2}>{getStatusChip(student.status)}</Grid>
                                        <Grid size={2}>
                                            <Chip
                                                label={student.gradeStatus}
                                                size="small"
                                                color={student.gradeStatus === "Completed" ? "success" : "warning"}
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Grid>
                                        <Grid size={2}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                disabled={student.gradeStatus === "Completed"}
                                                sx={{ textTransform: "none" }}
                                                onClick={() => console.log(`Opening grading modal for ${student.name}`)}
                                            >
                                                {student.gradeStatus === "Completed" ? "View Grade" : "Assess/Grade"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    </CustomCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SupervisorDashboard;
