import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router";
import { Container } from "@mui/material";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function Layout(props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" className="appbar">
        <Toolbar>
          <Box
            component="img"
            sx={{ flexGrow: 1, borderRadius: "50%", maxWidth: 50 }}
            src="/src/assets/logo.png"
          />

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => navigate("/a")}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}
