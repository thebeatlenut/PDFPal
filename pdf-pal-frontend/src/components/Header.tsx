import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useWindowWidth } from "../hooks";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
  detail: string;
  path?: string;
};

const Header = (props: HeaderProps) => {
  const { title, detail, path = "/" } = props;
  const width = useWindowWidth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar
        sx={{
          backgroundColor: "white",
          top: 0,
          zIndex: 4,
          boxShadow: "none",
          position: "relative",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            onClick={() => navigate(path)}
            sx={{ cursor: "pointer", flexGrow: 1 }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {detail}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            sx={{
              width: "10rem",
              height: "2.5rem",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
