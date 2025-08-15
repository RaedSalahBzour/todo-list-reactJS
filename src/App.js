import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

export default function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#29bebeff",
      },
      secondary: {
        main: "#767b87ff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container className="App"></Container>
    </ThemeProvider>
  );
}
