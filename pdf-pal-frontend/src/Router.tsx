import { Navigate, Route, Routes } from "react-router-dom";
import { Compress, Merge, ComingSoon } from "./pages";
import { Home } from "./components";

const PdfPalRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={false} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<ComingSoon />} />

        <Route path="/merge-pdf" element={<Merge />} />
        <Route path="/compress-pdf" element={<Compress />} />
        <Route path="/compress-pdf" element={<Compress />} />
        <Route path="/pdf-annotator" element={<ComingSoon />} />
        <Route path="/split-pdf" element={<ComingSoon />} />
        <Route path="/word-to-pdf" element={<ComingSoon />} />
        <Route path="/pdf-to-word" element={<ComingSoon />} />
        <Route path="/jpg-to-pdf" element={<ComingSoon />} />
        <Route path="/pdf-to-jpg" element={<ComingSoon />} />
        <Route path="/esign-pdf" element={<ComingSoon />} />

        <Route path="/pdf-to-ppt" element={<ComingSoon />} />
        <Route path="/ppt-to-pdf" element={<ComingSoon />} />
        <Route path="/pdf-to-excel" element={<ComingSoon />} />
        <Route path="/excel-to-pdf" element={<ComingSoon />} />
        <Route path="/number-pages" element={<ComingSoon />} />
        <Route path="/delete-pdf-pages" element={<ComingSoon />} />
        <Route path="/rotate-pdf" element={<ComingSoon />} />
        <Route path="/unlock-pdf" element={<ComingSoon />} />
        <Route path="/protect-pdf" element={<ComingSoon />} />
        
        <Route path="/documents" element={<ComingSoon />} />
        <Route path="/account" element={<ComingSoon />} />
      </Routes>
    </>
  );
};

export default PdfPalRoutes;
