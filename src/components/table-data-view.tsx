import { DataGrid, type GridColDef, type GridRowIdGetter, type GridValidRowModel } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";

interface Props<T> {
    data: T[];
    columns: GridColDef[];
    getRowId?: GridRowIdGetter;
}

const TableDataView = <T extends GridValidRowModel>({ data, columns, getRowId }: Props<T>) => {
    const theme = useTheme();

    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={getRowId} // Use the passed getRowId prop, or default to using 'id'
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
            disableColumnResize
            disableColumnMenu
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
    );
};

export default TableDataView;
