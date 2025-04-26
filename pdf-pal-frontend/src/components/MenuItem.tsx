import { Box, ListItemButton, ListItemIcon, ListItemText, Popover, List, ListItem } from "@mui/material";
import * as React from "react";
import { NavigateFunction } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

type SubItem = {
  path: string;
  icon: React.ReactNode;
  label: string;
};

type MenuItemProps = {
  open: boolean;
  path: string;
  icon: React.ReactNode;
  navigate: NavigateFunction;
  label: string;
  subItems?: SubItem[];
};

const MenuItemComponent = (props: MenuItemProps) => {
  const { open, path, icon, label, navigate, subItems = [] } = props;
  const { selected } = useAppSelector((state) => state.nav);
  const isActive = selected === path.split("/")[1];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (subItems.length > 0) {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    if (subItems.length > 0) {
      closeTimeout.current = setTimeout(() => {
        setAnchorEl(null);
      }, 300);
    }
  };

  const openPopover = Boolean(anchorEl);

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: "center",
            ml: 1,
            borderRadius: "20px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            backgroundColor: isActive ? "white" : "transparent",
            "&:hover": {
              backgroundColor: isActive ? "white" : "transparent",
            },
            flexDirection: "column",
          }}
          onClick={() => {
            if (subItems.length === 0) {
              navigate(path);
            }
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              color: isActive ? "primary.main" : "white",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              color: isActive ? "primary.main" : "white",
            }}
          />
        </ListItemButton>
      </ListItem>

      {subItems.length > 0 && (
        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              backgroundColor: "#333",
              color: "white",
              marginLeft: "10px",
              boxShadow: "none",
            },
          }}
          disableRestoreFocus
        >
          <List component="nav" sx={{ padding: 0 }}>
            {subItems.map((subItem, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  navigate(subItem.path);
                  setAnchorEl(null);
                }}
                sx={{ display: "block", backgroundColor: "#333" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "flex-start",
                    pl: 4,
                    borderRadius: "20px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    flexDirection: "row",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      color: "white",
                      mr: 2,
                    }}
                  >
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={subItem.label}
                    sx={{ color: "white" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </Box>
  );
};

const MenuItem = React.memo(MenuItemComponent);
export default MenuItem;
