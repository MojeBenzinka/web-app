import Box from "@mui/material/Box";
import type { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import InfoPanel from "../components/infopanel/infopanel";
import MainLayout from "../components/layout/main-layout";
import DynamicMap from "../components/map/mapdynamic";
import selectedStation from "../src/atoms/selected-station";

// const drawerWidth = 500;

const Home: NextPage = () => {
  // const selected = useRecoilValue(selectedStation);

  // const w = selected ? drawerWidth : 0;

  const { t } = useTranslation();

  return (
    <MainLayout>
      <Head>
        <title>{t("meta:title")}</title>
        <meta name="description" content={t("meta:description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <DynamicMap />
        <InfoPanel />
      </Box>
    </MainLayout>
  );
};

export default Home;
