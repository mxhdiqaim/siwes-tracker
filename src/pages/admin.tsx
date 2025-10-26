import { type FC } from "react";
import { AppBar, Box, Button, Grid, Toolbar, Typography, styled, useTheme } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";
import type { GridColDef } from "@mui/x-data-grid";
import TableDataView from "@/components/table-data-view.tsx";
import { useNavigate } from "react-router-dom";

// Styled component for the hidden file input
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const attendanceLogs = [
    {
        id: 1,
        name: "Dr. Musa Bello",
        course: "CIT 201",
        date: "2025-10-18",
        timeIn: "08:10 AM",
        location: "Main Campus",
        status: "Present",
    },
    {
        id: 2,
        name: "Mrs. Amina Ali",
        course: "ENG 103",
        date: "2025-10-18",
        timeIn: "09:05 AM",
        location: "Campus Annex",
        status: "Present",
    },
    {
        id: 3,
        name: "Engr. Usman Yakubu",
        course: "EEE 204",
        date: "2025-10-18",
        timeIn: "10:00 AM",
        location: "Engineering Block",
        status: "Present",
    },
    {
        id: 4,
        name: "Mr. Danjuma Sani",
        course: "MTH 102",
        date: "2025-10-17",
        timeIn: "08:45 AM",
        location: "Science Block",
        status: "Late",
    },
    {
        id: 5,
        name: "Dr. Hadiza Ibrahim",
        course: "CSC 301",
        date: "2025-10-17",
        timeIn: "—",
        location: "N/A",
        status: "Absent",
    },
];

const AdminDashboard: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
        const file = event.target.files?.[0];
        if (file) {
            alert(`${fileType} file "${file.name}" selected successfully!`);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Present":
                return theme.palette.success.main;
            case "Late":
                return theme.palette.warning.main;
            case "Absent":
                return theme.palette.error.main;
            default:
                return theme.palette.text.primary;
        }
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Lecturer Name", flex: 1 },
        { field: "course", headerName: "Course", flex: 1 },
        { field: "date", headerName: "Date", flex: 1 },
        { field: "timeIn", headerName: "Time In", flex: 1 },
        { field: "location", headerName: "Location", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
                <Typography sx={{ color: getStatusColor(params.value), fontWeight: "bold" }}>{params.value}</Typography>
            ),
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <AppBar position="static" sx={{ backgroundColor: "primary.dark" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Dashboard - GPS Lecturer Tracking
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ my: 2 }}>
                <Grid container spacing={3}>
                    {/* Management Cards */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomCard>
                            <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                                Manage Lecturers
                            </Typography>
                            <Typography color="text.secondary">Add, edit, or bulk upload lecturer profiles.</Typography>
                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/admin/lecturers")}
                                >
                                    Open
                                </Button>
                                <Button component="label" variant="contained" color="success">
                                    Bulk Upload
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept=".csv, .xlsx"
                                        onChange={(e) => handleFileChange(e, "Lecturers list")}
                                    />
                                </Button>
                            </Box>
                            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                                Accepted format: .csv or .xlsx
                            </Typography>
                        </CustomCard>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomCard>
                            <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                                Schedules
                            </Typography>
                            <Typography color="text.secondary">Upload or manage teaching schedules.</Typography>
                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/admin/schedules")}
                                >
                                    Open
                                </Button>
                                <Button component="label" variant="contained" color="success">
                                    Bulk Upload
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept=".csv, .xlsx"
                                        onChange={(e) => handleFileChange(e, "Teaching schedule")}
                                    />
                                </Button>
                            </Box>
                            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                                Accepted format: .csv or .xlsx
                            </Typography>
                        </CustomCard>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomCard>
                            <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                                Students List
                            </Typography>
                            <Typography color="text.secondary">Upload or update students' information.</Typography>
                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                <Button variant="contained" color="primary" onClick={() => navigate("/admin/students")}>
                                    View Students
                                </Button>
                                <Button component="label" variant="contained" color="success">
                                    Bulk Upload
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept=".csv, .xlsx"
                                        onChange={(e) => handleFileChange(e, "Students list")}
                                    />
                                </Button>
                            </Box>
                            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                                Accepted format: .csv or .xlsx
                            </Typography>
                        </CustomCard>
                    </Grid>

                    {/* Attendance Logs Table */}
                    <Grid size={12}>
                        <CustomCard>
                            <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                                Attendance Logs
                            </Typography>
                            <Typography color="text.secondary" mb={2}>
                                Recent lecturer attendance records.
                            </Typography>
                            <TableDataView data={attendanceLogs} columns={columns} />
                            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                                View Full Report
                            </Button>
                        </CustomCard>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
