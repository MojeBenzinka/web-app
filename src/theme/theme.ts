import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";

const theme = (dark: boolean) =>
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: dark ? darkScrollbar() : null,
        },
      },
    },
    palette: {
      mode: dark ? "dark" : "light",
      primary: {
        main: "#e00000",
      },
      secondary: {
        main: green[500],
      },
    },
  });

export default theme;
