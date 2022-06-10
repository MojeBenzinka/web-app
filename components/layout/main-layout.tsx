import { useTheme } from "@mui/material/styles";
import React, { CSSProperties } from "react";

interface IChildren {
  children: React.ReactNode;
}

const MainLayout: React.FC<IChildren> = ({ children }) => {
  const theme = useTheme();
  const style: CSSProperties =
    theme.palette.mode === "dark" ? { backgroundColor: "#161616" } : {};

  return <main style={{ minHeight: "100vh", ...style }}>{children}</main>;
};

export default MainLayout;
