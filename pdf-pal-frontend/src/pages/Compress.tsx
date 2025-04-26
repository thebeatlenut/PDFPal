import { useState } from "react";
import { AppBar, Box, Button, Toolbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import SelectBox from "../components/SelectBox";
import PdfViewer from "../components/PdfViewer";

const Compress = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [compressedPdfBlob, setCompressedPdfBlob] = useState<Blob | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [outputFileSize, setOutputFileSize] = useState<string | null>(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const callApi = async () => {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file));

            const response = await fetch(`${API_BASE_URL}/compress`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const fileSizeHeader = response.headers.get("X-File-Size");
            console.log("File Size from backend:", fileSizeHeader);

            if (fileSizeHeader) {
                const sizeInBytes = parseInt(fileSizeHeader, 10);
                const sizeInKB = sizeInBytes / (1024);
                setOutputFileSize(sizeInKB.toFixed(2)); // store size in MB with 2 decimals
            }

            //console.log(response);
            const blob = await response.blob()
            setCompressedPdfBlob(blob);
            console.log(response.headers);

        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    const handleFinish = () => {
        if (files.length >= 1) {
            callApi();
        } else {
            alert("Please select at most 1 file.");
        }
    };

    const handleDownload = () => {
        if (!compressedPdfBlob) return;

        const url = window.URL.createObjectURL(compressedPdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "compressed.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    const handleStartOverClick = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleStartOverConfirm = () => {
        setFiles([]);
        setCompressedPdfBlob(null);
        setOpenDialog(false);
        setOutputFileSize(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                position: "relative",
            }}
        >
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#f2f2f2",
                    height: "60px",
                    zIndex: "1",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Toolbar sx={{ justifyContent: "flex-end" }}>
                    {!compressedPdfBlob && (<Button
                        variant="contained"
                        color="primary"
                        sx={{ width: "10rem", height: "2.5rem" }}
                        onClick={handleFinish}
                    >
                        Finish
                    </Button>)}
                    {compressedPdfBlob && (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ width: "10rem", height: "2.5rem" }}
                                onClick={handleDownload}
                            >
                                Download
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ width: "10rem", height: "2.5rem" }}
                                onClick={handleStartOverClick}
                            >
                                Start Over
                            </Button>


                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            {outputFileSize && (
                <Box sx={{ marginTop: 2, textAlign: "center" }}>
                    Output file size: {outputFileSize} KB
                </Box>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    flexGrow: 1,
                }}
            >

                {!compressedPdfBlob && (<SelectBox setFiles={setFiles} />)}
                {compressedPdfBlob && (
                    <Box sx={{ mt: 4, width: "100%", maxWidth: "800px" }}>
                        <PdfViewer file={compressedPdfBlob} />
                    </Box>
                )}
            </Box>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Start Over?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to start over? All selected files and merged PDF will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleStartOverConfirm} color="error" variant="contained">
                        Start Over
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Compress;
