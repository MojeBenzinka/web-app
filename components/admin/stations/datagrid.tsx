import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Station, useStationsQuery } from "../../../src/gql/types";
import Box from "@mui/material/Box";
import { CircularProgress, Container, Paper } from "@mui/material";
import CompanyPetrolModal from "./company-modal";

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

  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const handleClick: GridEventListener<"cellClick"> = (cell) => {
    if (cell.field === "company_id") {
      // console.log(cell);
      setSelectedStation(cell.row as Station);
    }
  };

  if (loading)
    return (
      <Container sx={{ py: 2 }}>
        <CircularProgress />
      </Container>
    );
  if (error) return <div>Error!</div>;
  if (!data || !data.stations) return <div>No data</div>;

  return (
    <>
      <Container sx={{ py: 2 }}>
        <Paper sx={{ height: "80vh" }}>
          <DataGrid
            rows={data.stations as Station[]}
            columns={columns}
            // pageSize={50}
            rowsPerPageOptions={[50, 100, 150, 200]}
            onCellDoubleClick={handleClick}
          />
        </Paper>

        <Box sx={{ mt: 2 }}>
          {selectedStation && (
            <Paper sx={{ p: 2 }}>
              <CompanyPetrolModal station={selectedStation} />
            </Paper>
          )}
        </Box>
      </Container>
    </>
  );
};

export default StationsDatagrid;
