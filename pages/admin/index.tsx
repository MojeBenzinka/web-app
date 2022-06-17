import { Button, Container } from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";
import MainLayout from "../../components/layout/main-layout";

const Admin: NextPage = () => {
  return (
    <MainLayout>
      <Container>
        <Link href="/admin/stations" passHref>
          <Button variant="contained" color="primary">
            Stanice
          </Button>
        </Link>
      </Container>
    </MainLayout>
  );
};

export default Admin;
