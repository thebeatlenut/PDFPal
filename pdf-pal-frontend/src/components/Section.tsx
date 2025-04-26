import React from "react";
import Card from "./Card";
import { Box, Typography } from "@mui/material";

type SectionProps = {
  title: string;
  cards: { title: string; imageUrl: string; path:string }[];
  backgroundColor: string;
  sx?: React.CSSProperties;
};

const Sections: React.FC<SectionProps> = ({
  title,
  cards,
  backgroundColor,
  sx,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "50%",
        width: "100%",
        padding: 2,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginBottom: 2,
            textAlign: "left",
            fontSize: "100%",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>

        {/* Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            width: "80%",
            ml: "40px",
          }}
        >
          {cards.map((card, index) => (
            <Card key={index} title={card.title} imageUrl={card.imageUrl} path={card.path} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Sections;
