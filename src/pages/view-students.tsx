import { Box, Button, Chip, Typography } from "@mui/material";
import TableDataView from "@/components/table-data-view.tsx";
import { type GridColDef } from "@mui/x-data-grid";
import { mockStudents } from "@/data/students.ts";
import { getStatusChip } from "@/components";
import { useNavigate } from "react-router-dom";

// Column definitions for the DataGrid, inspired by supervisor-dashboard.tsx
const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Name / Matric No",
        minWidth: 250,
        flex: 1,
        renderCell: (params) => (
            <Box>
                <Typography variant="body2" fontWeight={600}>
                    {params.row.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {params.row.matricNo}
                </Typography>
            </Box>
        ),
    },
    {
        field: "site",
        headerName: "SIWES Site",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "status",
        headerName: "Activity Status",
        minWidth: 150,
        flex: 1,
        renderCell: (params) => getStatusChip(params.value),
    },
    {
        field: "gradeStatus",
        headerName: "Grade Status",
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
            <Chip
                label={params.value}
                size="small"
                color={params.value === "Completed" ? "success" : "warning"}
                sx={{ fontWeight: 600 }}
            />
        ),
    },
];

const ViewStudents = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Button onClick={() => navigate(-1)} variant="contained" sx={{ mb: 2 }}>
                Go Back
            </Button>
            <Typography variant="h4" gutterBottom>
                Students
            </Typography>
            <Box sx={{ height: "calc(100vh - 200px)", width: "100%" }}>
                <TableDataView data={mockStudents} columns={columns} getRowId={(row) => row.id} />
            </Box>
        </Box>
    );
};

export default ViewStudents;
