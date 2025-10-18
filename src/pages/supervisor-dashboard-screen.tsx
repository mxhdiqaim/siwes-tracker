import { useMemo, type FC } from "react";
import { Box, Typography, Grid, useTheme, Card, CardContent, List, ListItem, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MapDisplay from "@/components/map-display.tsx";
import AttendanceWidget from "@/components/attendance-widget";
import { MOCK_LOCATIONS, DUTSE_CENTER } from "@/utils/map-location";
import CustomCard from "@/components/ui/custom-card.tsx";

// Mock data structure for assigned SIWES students
interface StudentProgress {
    name: string;
    matricNo: string;
    site: string;
    progress: number; // 0-100
    status: "Active" | "On-site" | "Pending Report";
}

const mockStudents: StudentProgress[] = [
    {
        name: "Blessing Eze",
        matricNo: "S21/0123",
        site: MOCK_LOCATIONS.SIWES_SITE.name,
        progress: 85,
        status: "On-site",
    },
    { name: "Chinedu Oki", matricNo: "S21/0456", site: "NaijaSoft Solutions", progress: 60, status: "Active" },
    { name: "Fatima Bello", matricNo: "S21/0789", site: "PowerGrid Eng.", progress: 40, status: "Pending Report" },
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

    // Helper to get chip colour based on student status
    const getStatusChip = (status: StudentProgress["status"]) => {
        let color: "success" | "warning" | "default" | "error" = "default";
        if (status === "On-site") color = "success";
        else if (status === "Pending Report") color = "warning";

        return <Chip label={status} size="small" color={color} sx={{ fontWeight: 600 }} />;
    };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Supervisor Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                Field Visit Verification and Student Monitoring
            </Typography>

            <Grid container spacing={4}>
                {/* 1. Supervisor Check-in Widget (Verification) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <CustomCard sx={{ borderRadius: theme.borderRadius.large, boxShadow: theme.customShadows.card }}>
                        <Box>
                            <AttendanceWidget
                                targetLocation="SIWES_SITE" // The supervisor must check in at the SIWES site
                                userRole="Supervisor"
                            />
                        </Box>
                    </CustomCard>
                </Grid>

                {/* 2. Map Verification Display (Real-time Verification Objective) */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <CustomCard
                        sx={{
                            borderRadius: theme.borderRadius.large,
                            boxShadow: theme.customShadows.card,
                            height: "500px",
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ height: "100%", width: "100%" }}>
                            <MapDisplay
                                center={DUTSE_CENTER} // Center the map on Abuja
                                markers={mapMarkers} // Show the Site vs. Supervisor's location
                            />
                        </Box>
                        <Box sx={{ p: 2, bgcolor: theme.palette.alternate.main }}>
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

                {/* 3. Student Progress Tracking (Monitoring Objective) */}
                <Grid size={12}>
                    <Card sx={{ borderRadius: theme.borderRadius.large, boxShadow: theme.customShadows.card }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                                Assigned SIWES Students ({mockStudents.length})
                            </Typography>
                            <List>
                                <ListItem
                                    sx={{
                                        bgcolor: theme.palette.customColors.tableHeader,
                                        borderRadius: theme.borderRadius.small,
                                        fontWeight: "bold",
                                    }}
                                >
                                    <Grid container>
                                        <Grid size={3}>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                Name
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                Matric No.
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                Site
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                Status
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                {mockStudents.map((student) => (
                                    <ListItem key={student.matricNo} divider>
                                        <Grid container alignItems="center">
                                            <Grid size={3}>
                                                <Typography variant="body1">{student.name}</Typography>
                                            </Grid>
                                            <Grid size={3}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {student.matricNo}
                                                </Typography>
                                            </Grid>
                                            <Grid size={3}>
                                                <Typography variant="body2">{student.site}</Typography>
                                            </Grid>
                                            <Grid size={3}>{getStatusChip(student.status)}</Grid>
                                        </Grid>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SupervisorDashboard;
