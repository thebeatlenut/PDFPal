# main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pdf_utils import merge_pdfs, compress_pdf
import os

app = FastAPI()

# Allow frontend origin
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Next.js (if needed)
    "https://pdf-pal-five.vercel.app",  # Next.js (if needed)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # or use ["*"] for all origins (not safe for prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition", "X-File-Size"]
)

@app.get("/")
def read_root():
    return {"message": "PDF Modifier Backend is running!"}


@app.post("/merge")
async def merge_pdfs_endpoint(files: List[UploadFile] = File(...)):
    if not files or len(files) < 2:
        return {"error": "At least two PDF files are required."}

    merged_pdf_path = merge_pdfs(files)

    # Open the merged PDF file
    pdf_file = open(merged_pdf_path, "rb")

    return StreamingResponse(
        pdf_file,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "inline; filename=xyz.pdf"
        }
    )

@app.post("/compress")
async def compress_pdfs_endpoint(files: List[UploadFile] = File(...)):
    if not files or len(files) > 1:
        return {"error": "Compression for only one file is supported."}

    compressed_file_path = compress_pdf(files)

    # Open the compressed PDF file
    pdf_file = open(compressed_file_path, "rb")
    compressed_file_size = os.path.getsize(compressed_file_path)

    return StreamingResponse(
        pdf_file,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'inline; filename="{os.path.basename(pdf_file.name)}"',
            "X-File-Size": str(compressed_file_size)
        }
    )

if __name__ == '__main__':
    print('PyCharm')
