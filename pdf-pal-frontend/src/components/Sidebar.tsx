import { Box, CssBaseline, Divider, List, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import {
  CompressOutlined,
  Inventory,
  ContentCut,
  Merge,
  RotateRight,
  Delete,
  GridView,
  FormatColorText,
  Draw,
  Crop,
  PowerInput,
  Tag,
  Gesture,
  AutoAwesome,
  Chat,
  Summarize,
  Apps,
  Lock,
  LockOpen,
  AlignVerticalBottom,
  Folder,
  Person,
} from "@mui/icons-material";
import SmallLogo from "../assets/media/logos/hamster-face-svgrepo-com.svg";

const drawerWidth = 80;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent">
        <DrawerHeader>
          <img
            src={SmallLogo}
            alt="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </DrawerHeader>
        <Divider />
        <List>
          <MenuItem
            key="compress"
            label="Compress"
            navigate={navigate}
            path="/compress-pdf"
            icon={<CompressOutlined />}
            open={false}
          />
          <MenuItem
            key="organize"
            label="Organize"
            navigate={navigate}
            path="/organize"
            icon={<Inventory />}
            subItems={[
              {
                path: "/merge-pdf",
                label: "Merge",
                icon: <Merge />,
              },
              {
                path: "/split",
                label: "Split",
                icon: <ContentCut />,
              },
              {
                path: "/rotate",
                label: "Rotate",
                icon: <RotateRight />,
              },
              {
                path: "/delete-pages",
                label: "Delete Pages",
                icon: <Delete />,
              },
              {
                path: "/extract-pages",
                label: "Extract Pages",
                icon: <GridView />,
              },
            ]}
            open={false}
          />
          <MenuItem
            key="edit"
            label="Edit"
            navigate={navigate}
            path="/text"
            icon={<FormatColorText />}
            subItems={[
              {
                path: "/annotate-pdf",
                label: "Annotate",
                icon: <Draw />,
              },
              {
                path: "/edit-pdf",
                label: "Edit Text",
                icon: <FormatColorText />,
              },
              {
                path: "/crop-pdf",
                label: "Crop",
                icon: <Crop />,
              },
              {
                path: "/redact-pdf",
                label: "Redact",
                icon: <PowerInput />,
              },
              {
                path: "/number-pages",
                label: "Number Pages",
                icon: <Tag />,
              },
            ]}
            open={false}
          />
          <MenuItem
            key="sign"
            label="E-Sign"
            navigate={navigate}
            path="/e-sign"
            icon={<Gesture />}
            open={false}
          />
          <MenuItem
            key="ai"
            label="AI"
            navigate={navigate}
            path="/ai"
            icon={<AutoAwesome />}
            subItems={[
              {
                path: "/chat-with-pdf",
                label: "Chat With PDF",
                icon: <Chat />,
              },
              {
                path: "/ai-pdf-summarizer",
                label: "AI PDF Summarizer",
                icon: <Summarize />,
              },
            ]}
            open={false}
          />
          <MenuItem
            key="more"
            label="More"
            navigate={navigate}
            path="/more"
            icon={<Apps />}
            subItems={[
              {
                path: "/protect-pdf",
                label: "Protect",
                icon: <Lock />,
              },
              {
                path: "/unlock-pdf",
                label: "Unlock",
                icon: <LockOpen />,
              },
              {
                path: "/flatten-pdf",
                label: "Flatten",
                icon: <AlignVerticalBottom />,
              },
            ]}
            open={false}
          />
        </List>
        <Divider />
        <List>
          <MenuItem
            key="documents"
            label="Documents"
            navigate={navigate}
            path="/documents"
            icon={<Folder />}
            open={false}
          />
        </List>
        <Box sx={{ flexGrow: 1, pb: "0px" }} /> <Divider />
        <MenuItem
          key="account"
          label="Account"
          navigate={navigate}
          path="/account"
          icon={<Person />}
          open={false}
        />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
