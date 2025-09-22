import {
  Container,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const Welcome = () => {
  const theme = createTheme({
    typography: {
      h5: {
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className="welcome-container">
        <Typography color="text" variant="h5">
          İşlemlere Başlamak İçin Bir Menü Seçin
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Welcome;
