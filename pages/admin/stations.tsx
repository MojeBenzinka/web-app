import type { NextPage } from "next";
import { useStationsQuery } from "../../src/gql/types";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import StationsDatagrid from "../../components/admin/stations/datagrid";
import MainLayout from "../../components/layout/main-layout";

const Stations: NextPage = () => {
  return (
    <MainLayout>
      <StationsDatagrid />
    </MainLayout>
  );
};

export default Stations;
