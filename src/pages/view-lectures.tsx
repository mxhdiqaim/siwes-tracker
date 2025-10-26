import { Box, Button, Typography } from "@mui/material";
import TableDataView from "@/components/table-data-view.tsx";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { lecturers } from "@/data/lecturers.ts";

// Column definitions for the DataGrid
const columns: GridColDef[] = [
    {
        field: "regNumber",
        headerName: "Reg Number",
        width: 150,
    },
    {
        field: "name",
        headerName: "Name",
        width: 200,
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        width: 250,
        flex: 1,
    },
    {
        field: "department",
        headerName: "Department",
        width: 200,
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 150,
    },
];

const ViewLectures = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Button onClick={() => navigate(-1)} variant="contained" sx={{ mb: 2 }}>
                Go Back
            </Button>
            <Typography variant="h4" gutterBottom>
                Lecturers
            </Typography>
            <Box sx={{ height: "calc(100vh - 200px)", width: "100%" }}>
                <TableDataView data={lecturers} columns={columns} getRowId={(row) => row.regNumber} />
            </Box>
        </Box>
    );
};

export default ViewLectures;
