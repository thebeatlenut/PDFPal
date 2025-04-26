import { Box } from "@mui/material";
import Section from "./Section";
import Merge from "../assets/media/merge-svgrepo-com.svg";
import Compress from "../assets/media/compress-icon.svg";
import Delete from "../assets/media/delete.svg";
import ExcelIcon from "../assets/media/excel to pdf.svg";
import JpgIcon from "../assets/media/jpg-to-pdf.svg";
import Lock from "../assets/media/lock-.svg";
import NumberSign from "../assets/media/number-sign.svg";
import PdfAnnotator from "../assets/media/pdf-annotator.svg";
import PPTIcon from "../assets/media/ppt-svgrepo-com.svg";
import RotateIcon from "../assets/media/rotate-right-svgrepo-com.svg";
import SignIcon from "../assets/media/signature.svg";
import SplitIcon from "../assets/media/split-pdf.svg";
import UnlockIcon from "../assets/media/unlock-svgrepo-com.svg";
import WordIcon from "../assets/media/word-to-pdf.svg";

const Home = () => {
  const popularTools = [
    { title: "Merge PDF", imageUrl: Merge, path: "/merge-pdf" },
    { title: "Compress PDF", imageUrl: Compress, path: "/compress-pdf" },
    { title: "PDF Annotator", imageUrl: PdfAnnotator, path: "/pdf-annotator" },
    { title: "Split PDF", imageUrl: SplitIcon, path: "/split-pdf" },
    { title: "Word to PDF", imageUrl: WordIcon, path: "/word-to-pdf" },
    { title: "PDF to Word", imageUrl: WordIcon, path: "/pdf-to-word" },
    { title: "JPG to PDF", imageUrl: JpgIcon, path: "/jpg-to-pdf" },
    { title: "PDF to JPG", imageUrl: JpgIcon, path: "/pdf-to-jpg" },
    { title: "eSign PDF", imageUrl: SignIcon, path: "/esign-pdf" },
  ];
  
  const moreTools = [
    { title: "PDF to PPT", imageUrl: PPTIcon, path: "/pdf-to-ppt" },
    { title: "PPT to PDF", imageUrl: PPTIcon, path: "/ppt-to-pdf" },
    { title: "PDF to Excel", imageUrl: ExcelIcon, path: "/pdf-to-excel" },
    { title: "Excel to PDF", imageUrl: ExcelIcon, path: "/excel-to-pdf" },
    { title: "Number Pages", imageUrl: NumberSign, path: "/number-pages" },
    { title: "Delete PDF Pages", imageUrl: Delete, path: "/delete-pdf-pages" },
    { title: "Rotate PDF", imageUrl: RotateIcon, path: "/rotate-pdf" },
    { title: "Unlock PDF", imageUrl: UnlockIcon, path: "/unlock-pdf" },
    { title: "Protect PDF", imageUrl: Lock, path: "/protect-pdf" },
  ];
  

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <Section
        title="Most Popular PDF Tools"
        cards={popularTools}
        backgroundColor="#f0f4f8"
        sx={{
          paddingTop: "20px",
        }}
      />
      <Section
        title="More Tools"
        cards={moreTools}
        backgroundColor="#e8ecef"
        sx={{
          paddingTop: "20px",
        }}
      />
    </Box>
  );
};

export default Home;
