import Box from "@mui/material/Box";
import React from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";

interface Data {
  primary: number;
  secondary: number;
}

const PriceChart: React.FC = () => {
  const data: UserSerie<Data>[] = [
    {
      label: "Nafta",
      data: [
        { primary: 1654728140, secondary: 20 },
        { primary: 1654728244, secondary: 30 },
        { primary: 1654728560, secondary: 40 },
        { primary: 1654728800, secondary: 50 },
        { primary: 1654729000, secondary: 60 },
      ],
    },
    {
      label: "Natural 95",
      data: [
        { primary: 1654728140, secondary: 30 },
        { primary: 1654728244, secondary: 50 },
        { primary: 1654728560, secondary: 20 },
        { primary: 1654728800, secondary: 24 },
        { primary: 1654729000, secondary: 48 },
      ],
    },
  ];

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <>
      <Box sx={{ minHeight: 300 }}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </Box>
    </>
  );
};

export default PriceChart;
