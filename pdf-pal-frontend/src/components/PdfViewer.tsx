import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source manually to a working CDN version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

interface PdfViewerProps {
  file: Blob;
}

const PdfViewer = ({ file }: PdfViewerProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderPdf = async () => {
      if (!canvasRef.current) return;

      canvasRef.current.innerHTML = "";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        canvasRef.current.appendChild(canvas);
      }
    };

    renderPdf();
  }, [file]);

  return (
    <div
      ref={canvasRef}
      style={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
      }}
    />
  );
};

export default PdfViewer;
