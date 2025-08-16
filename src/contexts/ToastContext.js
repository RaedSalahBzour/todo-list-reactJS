import { createContext, useState } from "react";
import MySnackbar from "../components/snackBar/SnackBar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState({ open: false, message: "" });

  function showHideToast(message) {
    setOpen({ open: true, message: message });
    setTimeout(() => {
      setOpen({ open: false, message: null });
    }, 4000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      {children}
      <MySnackbar open={open} />
    </ToastContext.Provider>
  );
};
