import { gql } from "@apollo/client";
import Box from "@mui/material/Box";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import InfoPanel from "../components/infopanel/infopanel";
import MainLayout from "../components/layout/main-layout";
import DynamicMap from "../components/map/mapdynamic";
import { ssrClient } from "../src/gql/client";
import type { Station, StationsQuery } from "../src/gql/types";

// const drawerWidth = 500;

interface IProps {
  stations: Station[];
}

const Home: NextPage<IProps> = ({ stations }) => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <Head>
        <title>{t("meta:title")}</title>
        <meta name="description" content={t("meta:description")} />
      </Head>

      <Box
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <DynamicMap stations={stations} />
        <InfoPanel />
      </Box>
    </MainLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const res = await ssrClient.query<StationsQuery>({
    query: gql`
      query Stations {
        stations {
          id
          lat
          lon
          company {
            id
            name
            logo_img
          }
        }
      }
    `,
  });

  if (!res.error && res.data && res.data.stations) {
    return {
      props: {
        stations: res.data.stations as Station[],
      },
    };
  }

  return {
    props: {
      stations: [],
    },
  };
};
