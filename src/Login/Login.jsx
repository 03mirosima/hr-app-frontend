import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";

const Login = () => {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "2em",
        fontWeight: "bold",
        color:"#787878"
      },
      h2: {
        fontSize: "1em",
        fontWeight: "bold",
      },
       button: {
      textTransform: 'none'
    }
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container className="login-container">
        <Paper elevation={10} className={"login-paper"}>
          <Grid size={6} className="grid">
            <Typography variant="h1">Giriş Yap</Typography>
            <TextField
              label="Kullanıcı Adı"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Şifre"
              placeholder="Şifre Giriniz..."
              type="password"
              variant="outlined"
              fullWidth
              required
            />
             <Button variant="outlined">Oturum Aç</Button>
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
