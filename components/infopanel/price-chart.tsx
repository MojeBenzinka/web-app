import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import React, { useMemo } from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";
import { useStationQuery } from "../../src/gql/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { LinearProgress } from "@mui/material";

interface Data {
  primary: Date;
  secondary: number;
}

interface IProps {
  stationId: string;
}

const PriceChart: React.FC<IProps> = ({ stationId }) => {
  const { data, loading, error } = useStationQuery({
    variables: { stationId },
  });

  const theme = useTheme();

  // const datata: UserSerie<Data>[] = [
  //   {
  //     label: "Nafta",
  //     data: [
  //       { primary: 1654728140, secondary: 20 },
  //       { primary: 1654728244, secondary: 30 },
  //       { primary: 1654728560, secondary: 40 },
  //       { primary: 1654728800, secondary: 50 },
  //       { primary: 1654729000, secondary: 60 },
  //     ],
  //   },
  //   {
  //     label: "Natural 95",
  //     data: [
  //       { primary: 1654728140, secondary: 30 },
  //       { primary: 1654728244, secondary: 50 },
  //       { primary: 1654728560, secondary: 20 },
  //       { primary: 1654728800, secondary: 24 },
  //       { primary: 1654729000, secondary: 48 },
  //     ],
  //   },
  // ];

  const datatata = useMemo<UserSerie<Data>[]>(() => {
    const prices = data?.station?.pricesHistory ?? [];

    const current = data?.station?.prices ?? [];

    const pricesGroupped: UserSerie<Data>[] = prices
      .filter((p) => p != null && p.length > 0)
      .map((p, i) => {
        const data: Data[][] = p!.map((price) => {
          const date = new Date(price?.date);

          return [
            {
              primary: date,
              secondary: price?.price ?? 0,
            },
          ];
        });

        // make into one array
        const d = data.reduce((acc, cur) => {
          return acc.concat(cur);
        }, [] as Data[]);

        return {
          label: p?.[0]?.type?.name ?? "",
          data: d,
        };
      });

    return pricesGroupped;
  }, [data]);

  const primaryAxis = React.useMemo<
    AxisOptions<typeof datatata[number]["data"][number]>
  >(
    () => ({
      scalarType: "time",
      getValue: (datum) => datum.primary as unknown as Date,
      formatters: {
        scale: (date: Date) => moment(date).format("DD.MM.YYYY"),
      },
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof datatata[number]["data"][number]>[]
  >(
    () => [
      {
        max: 50,
        min: 40,
        scaleType: "linear",
        getValue: (datum) => datum.secondary,
        formatters: {
          scale: (date) => date?.toFixed(2),
          // tooltip: (date) => date?.toFixed(2),
          // cursor: (date) => date?.toFixed(2),
        },
      },
    ],
    []
  );

  const { t } = useTranslation();

  if (loading) {
    return <LinearProgress variant="indeterminate" />;
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 2,
          height: 20,
          display: "flex",
        }}
      >
        {t("prices:history:error")}
      </Box>
    );
  }

  if (!data || !data.station || !stationId || datatata.length == 0) {
    return (
      <Box
        sx={{
          p: 2,
          height: 20,
          display: "flex",
        }}
      >
        {t("prices:history:noData")}
      </Box>
    );
  }

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>{t("prices:history:title")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ minHeight: 300, marginBottom: 3 }}>
            <Chart
              options={{
                data: datatata,
                primaryAxis,
                secondaryAxes,
                dark: theme.palette.mode === "dark",
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default PriceChart;
