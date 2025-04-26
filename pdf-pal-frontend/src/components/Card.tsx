import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { useNavigate } from "react-router-dom";

type CardProps = {
  title: string;
  imageUrl: string;
  path: string;
};

const Card: React.FC<CardProps> = ({ title, imageUrl, path }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(path)}
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderColor: "grey.500",
        minHeight: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 1,
        width: "100%",
        cursor: "pointer", // show pointer on hover
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      {/* Image Icon */}
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        sx={{
          width: 24,
          height: 24,
          marginRight: 1,
        }}
      />
      {/* Title */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: "0.75rem" }}>{title}</Typography>
      </Box>
      {/* Arrow Icon */}
      <ArrowForwardIosIcon sx={{ fontSize: "0.75rem", color: "action.active" }} />
    </Box>
  );
};

export default Card;
