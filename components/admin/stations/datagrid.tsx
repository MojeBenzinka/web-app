import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Station, useStationsQuery } from "../../../src/gql/types";
import Box from "@mui/material/Box";
import { Container, Paper } from "@mui/material";

const columns: GridColDef<Station>[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "lat", headerName: "Latitude", width: 130 },
  { field: "lon", headerName: "Longitude", width: 130 },
  {
    field: "company_id",
    headerName: "Company",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const data = params.row as Station;
      return data.company?.name ?? "";
    },
    //   `${params.value || ""} ${params.row.lastName || ""}`,
  },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

const StationsDatagrid: React.FC = () => {
  const { data, loading, error } = useStationsQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data || !data.stations) return <div>No data</div>;

  return (
    <>
      <Container>
        <Paper sx={{ height: "80vh" }}>
          <DataGrid
            rows={data.stations as Station[]}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[5]}
          />
        </Paper>
      </Container>
    </>
  );
};

export default StationsDatagrid;
