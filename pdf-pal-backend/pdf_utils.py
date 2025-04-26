# pdf_utils.py
import subprocess
import tempfile
import pikepdf
from PyPDF2 import PdfMerger
import os

def convert_to_pdf(input_path, output_dir):
    subprocess.run([
        "libreoffice", "--headless", "--convert-to", "pdf", input_path, "--outdir", output_dir
    ], check=True)
    base = os.path.basename(input_path)
    name_without_ext = os.path.splitext(base)[0]
    return os.path.join(output_dir, f"{name_without_ext}.pdf")

def merge_pdfs(file_objects, output_dir='output/merged') -> str:
    merger = PdfMerger()

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    original_filename = file_objects[0].filename
    base_filename = os.path.splitext(original_filename)[0]
    output_filename = f"{base_filename}-merged.pdf"
    output_path = os.path.join(output_dir, output_filename)

    # Explicitly delete old file if exists
    if os.path.exists(output_path):
        os.remove(output_path)

    for file in file_objects:
        merger.append(file.file)

    with open(output_path, 'wb') as f_out:
        merger.write(f_out)

    merger.close()
    return output_path

def compress_pdf(file_objects, output_dir='output/compressed') -> str:
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    upload_file = file_objects[0]
    original_filename = upload_file.filename
    base_filename = os.path.splitext(original_filename)[0]

    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(original_filename)[1]) as tmp:
        tmp.write(upload_file.file.read())
        tmp_path = tmp.name

    # If not a PDF, convert
    if not original_filename.lower().endswith('.pdf'):
        tmp_converted_path = convert_to_pdf(tmp_path, os.path.dirname(tmp_path))
    else:
        tmp_converted_path = tmp_path

    output_filename = f"{base_filename}-compressed.pdf"
    output_path = os.path.join(output_dir, output_filename)

    # Explicitly delete old file if exists
    if os.path.exists(output_path):
        os.remove(output_path)

    pdf = pikepdf.open(tmp_converted_path)
    pdf.save(output_path)
    pdf.close()

    # Cleanup
    os.remove(tmp_path)
    if tmp_converted_path != tmp_path:
        os.remove(tmp_converted_path)

    return output_path
