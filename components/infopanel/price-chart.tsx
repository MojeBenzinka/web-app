import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import React, { CSSProperties, useMemo } from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";
import { Price, useStationQuery } from "../../src/gql/types";

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

    const pricesGroupped: UserSerie<Data>[] = prices
      .filter((p) => p != null && p.length > 0)
      .map((p) => ({
        label: p?.[0]?.type?.name ?? "",
        data: p!.map((price) => ({
          primary: new Date(price?.createdAt),
          secondary: price?.price ?? 0,
        })),
      }));

    // for (const p of prices) {
    //   if (!p) continue;
    //   const existing = pricesGroupped.find((x) => x.label == p.type?.name);

    //   if (existing) {
    //     existing.data.push({
    //       primary: new Date(p.updatedAt),
    //       secondary: p.price,
    //     });
    //     continue;
    //   }

    //   pricesGroupped.push({
    //     label: p.type?.name,
    //     data: [
    //       {
    //         primary: new Date(p.updatedAt),
    //         secondary: p.price,
    //       },
    //     ],
    //   });
    // }

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
        max: 60,
        min: 20,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (!data || !data.station || !stationId || datatata.length == 0) {
    return <div>No data</div>;
  }

  return (
    <>
      <Box sx={{ minHeight: 300 }}>
        <Chart
          options={{
            data: datatata,
            primaryAxis,
            secondaryAxes,
            dark: theme.palette.mode === "dark",
          }}
        />
      </Box>
    </>
  );
};

export default PriceChart;
