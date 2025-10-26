import { Box, Button, Typography } from "@mui/material";
import TableDataView from "@/components/table-data-view.tsx";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { schedules } from "@/data/schedules.ts";

// Column definitions for the DataGrid
const columns: GridColDef[] = [
    { field: "courseCode", headerName: "Course Code", width: 130 },
    { field: "courseTitle", headerName: "Course Title", width: 250, flex: 1 },
    { field: "lecturerName", headerName: "Lecturer", width: 200, flex: 1 },
    { field: "department", headerName: "Department", width: 200, flex: 1 },
    { field: "dayOfWeek", headerName: "Day", width: 120 },
    { field: "startTime", headerName: "Start Time", width: 120 },
    { field: "endTime", headerName: "End Time", width: 120 },
    { field: "location", headerName: "Location", width: 120 },
];

const ViewSchedules = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Button onClick={() => navigate(-1)} variant="contained" sx={{ mb: 2 }}>
                Go Back
            </Button>
            <Typography variant="h4" gutterBottom>
                Class Schedules
            </Typography>
            <Box sx={{ height: "calc(100vh - 200px)", width: "100%" }}>
                <TableDataView data={schedules} columns={columns} getRowId={(row) => row.id} />
            </Box>
        </Box>
    );
};

export default ViewSchedules;
