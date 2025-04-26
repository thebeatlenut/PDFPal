import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004D71",
    },
    secondary: {
      main: "#3f51b5",
    },
    error: {
      main: "#F1416C",
      light: "#FFC5D2",
    },
    warning: {
      main: "#FFC700",
      dark: "#C9A20A",
      light: "#FFF3C3",
    },
    success: {
      light: "#9EE9A3",
      main: "#66bb6a",
    },
    background: {
      default: "#EEEEEE",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#004D71",
          color: "white",
          border: 0,
          overflowY: "hidden",
          "&:hover": {
            overflowY: "auto",
          },
          /* Reduce the width of the scrollbar track */
          "&::-webkit-scrollbar": {
            width: 4,
          },
          /* Reduce the width of the scrollbar thumb */
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888" /* Set the color of the scrollbar thumb  */,
            borderRadius: 2 /* Rounded corners for the scrollbar thumb */,
          },
          /* Change the background color of the scrollbar track */
          "&::-webkit-scrollbar-track": {
            backgroundColor:
              "#f1f1f1" /* Set the color of the scrollbar track */,
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.8rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.8rem",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.8rem",
        },
      },
    },
  },
});

export default theme;
