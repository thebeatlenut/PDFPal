import { Box, Paper, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          position: "fixed",
          mt: 2,
          color: "gray",
          fontSize: "0.7rem",
          bottom: 0,
          width: "100%",
        }}
        elevation={1}
      >
        <Typography
          sx={{
            fontFamily: "'Pacifico', cursive",
            textAlign: "center",
            opacity: "20%",
          }}
          variant="h6"
        >
          pdfpal
        </Typography>
      </Paper>
    </Box>
  );
};

export default Footer;
