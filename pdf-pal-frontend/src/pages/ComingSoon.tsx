import { Box, Typography, Button } from "@mui/material";

const ComingSoon = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f8fafc", // light background
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Coming Soon
            </Typography>

            <Typography variant="h6" sx={{ color: "gray", marginBottom: "2rem" }}>
                We're working hard to bring something amazing for you!
            </Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ padding: "0.8rem 2rem", borderRadius: "50px", textTransform: "none" }}
            >
                Notify Me
            </Button>
        </Box>
    );
};

export default ComingSoon;
