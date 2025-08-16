import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Main from "./components/main/main";
import MySnackbar from "./components/snackBar/SnackBar";
import { useState } from "react";
import { ToastContext } from "./contexts/ToastContext";
export default function App() {
  const [open, setOpen] = useState({ open: false, message: "" });

  function showHideToast(message) {
    setOpen({ open: true, message: message });
    setTimeout(() => {
      setOpen({ open: false, message: null });
    }, 3000);
  }

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
      <ToastContext.Provider value={{ showHideToast }}>
        <Container maxWidth="xs">
          <Main />
          <MySnackbar open={open} />
        </Container>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}
