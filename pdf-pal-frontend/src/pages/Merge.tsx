import { useState } from "react";
import { AppBar, Box, Button, Toolbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import SelectBox from "../components/SelectBox";
import PdfViewer from "../components/PdfViewer";

const Merge = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedBlobPdf, setMergedBlobPdf] = useState<Blob | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const callApi = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("http://localhost:8000/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log(response);
      const blob = await response.blob()
      setMergedBlobPdf(blob);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleFinish = () => {
    if (files.length >= 2) {
      callApi();
    } else {
      alert("Please select at least 2 files.");
    }
  };

  const handleDownload = () => {
    if (!mergedBlobPdf) return;

    const url = window.URL.createObjectURL(mergedBlobPdf);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "merged.pdf");
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
    setMergedBlobPdf(null);
    setOpenDialog(false);
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
          {!mergedBlobPdf && (<Button
            variant="contained"
            color="primary"
            sx={{ width: "10rem", height: "2.5rem" }}
            onClick={handleFinish}
          >
            Finish
          </Button>)}
          {mergedBlobPdf && (
            <>
              <Button
                variant="outlined"
                color="primary"
                sx={{ width: "10rem", height: "2.5rem" }}
                onClick={handleDownload}
              >
                Download
              </Button>
              <Button
                variant="text"
                color="error"
                sx={{ width: "10rem", height: "2.5rem" }}
                onClick={handleStartOverClick}
              >
                Start Over
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          flexGrow: 1,
        }}
      >
        {!mergedBlobPdf && (<SelectBox setFiles={setFiles} />)}
        {mergedBlobPdf && (
          <Box sx={{ mt: 4, width: "100%", maxWidth: "800px" }}>
            <PdfViewer file={mergedBlobPdf} />
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

export default Merge;
