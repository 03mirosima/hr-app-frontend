import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router";

const navItems = [
  { name: "Çalışan Listele", link: "/employeelist" },
  { name: "Envanter Listele", link: "/inventorylist" },
  { name: "Zimmetleme", link: "/assignmentlist" },
  { name: "Zimmeti Teslim Al", link: "/assignmentform" },
];

export default function MenuComponent() {
  const navigate = useNavigate();

  return (
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
              onClick={() => navigate(item.link)}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
