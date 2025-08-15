import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Main from "./components/main/main";
export default function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#0c766ad8",
      },
      secondary: {
        main: "#b4b4b4ff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Main />
      </Container>
    </ThemeProvider>
  );
}
