import React, { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";

type SelectBoxProps = {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const SelectBox = ({ setFiles }: SelectBoxProps) => {
  const [files, setLocalFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setLocalFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...selectedFiles];
      setFiles(newFiles); // Update parent component's state
      return newFiles;
    });
  };

  const handleRemoveFile = (fileName: string) => {
    setLocalFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
      setFiles(updatedFiles); // Update parent component's state
      return updatedFiles;
    });
  };

  const handleAddMoreFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(229, 238, 255)",
        border: "1px dotted #ADD8E6",
        padding: "20px",
        textAlign: "center",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        boxSizing: "border-box",
        cursor: "pointer",
        overflow: "hidden",
        minWidth: 0,
        height: `calc(100vh - 180px - 40px)`,
        "@media (max-width: 600px)": {
          height: `calc(100vh - 120px - 20px)`,
          margin: "10px",
        },
        "@media (min-width: 600px) and (max-width: 1200px)": {
          height: `calc(100vh - 130px - 30px)`,
          margin: "15px",
        },
      }}
    >
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
      />
      {files.length === 0 ? (
        <>
          <Button
            variant="contained"
            sx={{ marginBottom: "10px" }}
            onClick={handleAddMoreFiles}
          >
            Select Files
          </Button>
          <Typography variant="body2">
            Add PDF, image, Word, Excel, and PowerPoint files
          </Typography>
          <Typography variant="body2">
            Supported formats: PDF, DOC, XLS, PPT, PNG, JPG
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Selected Files
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            {files.map((file) => (
              <Box
                key={file.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "4px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="body2">{file.name}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveFile(file.name)}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              sx={{ marginTop: "10px" }}
              onClick={handleAddMoreFiles}
            >
              Add More Files
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SelectBox;
