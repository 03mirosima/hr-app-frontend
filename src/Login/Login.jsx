import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axiosReceptor from "../services/axiosReceptor.js";
import { useState } from "react";
import { useNavigate } from "react-router";
import AlertComponent from "../common/AlertComponent.jsx";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "2em",
        fontWeight: "bold",
        color: "#787878",
      },
      h2: {
        fontSize: "1em",
        fontWeight: "bold",
      },
      button: {
        textTransform: "none",
      },
    },
  });
  const handleLogin = async () => {
    /*  navigate("/welcome"); */
    try {
      const response = await axiosReceptor.post("/authenticate", form);
      localStorage.setItem("accessToken", response.data.token);
      navigate("/welcome");
    } catch (err) {
      //errorkoy
      return setShowError(true);
    }
  };
  const onFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container className="login-container">
        <Paper elevation={10} className={"login-paper"}>
          <Grid size={6} className="grid">
            <Typography variant="h1">Giriş Yap</Typography>
            <TextField
              name="username"
              label="Kullanıcı Adı"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => onFormChange(e)}
            />
            <TextField
              name="password"
              label="Şifre"
              placeholder="Şifre Giriniz..."
              type="password"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => onFormChange(e)}
            />
            <Button
              className="grey-button"
              variant="outlined"
              onClick={handleLogin}
            >
              Oturum Aç
            </Button>
          </Grid>
          <Grid size={6} className="grid grid-sign-in-right">
            <Box
              component="img"
              sx={{
                borderRadius: "50%",
                maxWidth: 200,
              }}
              src="/src/assets/logo.png"
            />
            <Typography variant="h2">Merhabalar,</Typography>
            <Typography>
              Envanter platformuna giriş yapmak için giriş yapın!
            </Typography>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
