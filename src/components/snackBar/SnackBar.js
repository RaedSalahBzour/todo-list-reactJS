import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ open }) {
  return (
    <div>
      <Snackbar open={open.open} autoHideDuration={3000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {open.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
