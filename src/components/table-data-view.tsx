import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip, Typography, useTheme } from "@mui/material";
import { getStatusChip } from "@/components/index.tsx";
import type { StudentProgress } from "@/utils";

interface Props {
    mockStudents: StudentProgress[];
}

const TableDataView = ({ mockStudents }: Props) => {
    const theme = useTheme();

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name/Matric",
            minWidth: 200,
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
        { field: "site", headerName: "Site", minWidth: 180, flex: 1 },
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
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    disabled={params.row.gradeStatus === "Completed"}
                    sx={{ textTransform: "none" }}
                    onClick={() => console.log(`Opening grading modal for ${params.row.name}`)}
                >
                    {params.row.gradeStatus === "Completed" ? "View Grade" : "Assess/Grade"}
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={mockStudents}
                columns={columns}
                getRowId={(row) => row.matricNo}
                rowHeight={64}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                sx={{
                    border: "none",
                    "& .MuiDataGrid-columnHeaders": {
                        background: theme.palette.customColors.tableHeader,
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    },
                }}
            />
        </Box>
    );
};

export default TableDataView;
