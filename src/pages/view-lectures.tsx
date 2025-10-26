import { Box, Button, Typography } from "@mui/material";
import TableDataView from "@/components/table-data-view.tsx";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const lecturers = [
    {
        regNumber: "JPT/LEC/001",
        name: "Dr. Aminu Bello",
        email: "a.bello@jigpoly.edu.ng",
        department: "Computer Science",
        phone: "123-456-7890",
    },
    {
        regNumber: "JPT/LEC/002",
        name: "Prof. Fatima Ahmed",
        email: "f.ahmed@jigpoly.edu.ng",
        department: "Electrical Engineering",
        phone: "234-567-8901",
    },
    {
        regNumber: "JPT/LEC/003",
        name: "Mr. Chinedu Okoro",
        email: "c.okoro@jigpoly.edu.ng",
        department: "Mechanical Engineering",
        phone: "345-678-9012",
    },
    {
        regNumber: "JPT/LEC/004",
        name: "Mrs. Zainab Ibrahim",
        email: "z.ibrahim@jigpoly.edu.ng",
        department: "Civil Engineering",
        phone: "456-789-0123",
    },
    {
        regNumber: "JPT/LEC/005",
        name: "Dr. Halima Yusuf",
        email: "h.yusuf@jigpoly.edu.ng",
        department: "Science Lab Technology",
        phone: "567-890-1234",
    },
    {
        regNumber: "JPT/LEC/006",
        name: "Mr. Tunde Adebayo",
        email: "t.adebayo@jigpoly.edu.ng",
        department: "Statistics",
        phone: "678-901-2345",
    },
];

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
