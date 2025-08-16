import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../../contexts/ToastContext";
import EditDialog from "../dialogs/EditDialog";
import { TaskContext } from "../../contexts/tasksContext";

export default function Task({ id, title, isDone }) {
  const theme = useTheme();
  const { showHideToast } = useContext(ToastContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { dispatch } = useContext(TaskContext);

  const openPopUp = () => setOpenEditDialog(true);
  const closePopUp = () => setOpenEditDialog(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  function toggleState() {
    dispatch({ type: "toggle", payload: { id: id } });
    showHideToast(isDone ? "removed from done list" : "added to done list");
  }

  function handleSaveEdit(newName) {
    dispatch({ type: "edit", payload: { id: id, name: newName } });
    showHideToast("Task edited");
  }

  function deleteTask() {
    dispatch({ type: "delete", payload: { id: id } });
    showHideToast("task deleted");
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "15px",
        marginBottom: "10px",
        padding: "10px 20px",
      }}
    >
      <h3>{title}</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        <IconButton
          sx={{ color: isDone ? "green" : "gray" }}
          onClick={toggleState}
        >
          <CheckCircleOutlineIcon />
        </IconButton>

        <Button onClick={openPopUp}>
          <EditIcon style={{ color: orange[300] }} />
        </Button>
        <EditDialog
          open={openEditDialog}
          onClose={closePopUp}
          task={{ id, name: title }}
          onSave={handleSaveEdit}
        />

        <IconButton color="error" onClick={handleOpenDeleteDialog}>
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            {"Confirm Delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={deleteTask} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Stack>
  );
}
