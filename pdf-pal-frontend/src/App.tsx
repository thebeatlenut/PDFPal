import React from "react";
import { Box } from "@mui/material";
import { Footer, Header, Sidebar } from "./components";
import PdfPalRoutes from "./Router";

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Header title="Home" detail={""} />
        <PdfPalRoutes />
      </Box>
    </Box>
  );
};

export default App;
