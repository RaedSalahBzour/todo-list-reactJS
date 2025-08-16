import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { red, orange } from "@mui/material/colors";
import { useContext, useState } from "react";
import { TaskContext } from "../../contexts/tasksContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../../contexts/ToastContext";
import EditDialog from "../dialogs/EditDialog";

export default function Task({ id, title, isDone }) {
  const theme = useTheme();
  const { tasks, setTasks } = useContext(TaskContext);
  const { showHideToast } = useContext(ToastContext);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const openPopUp = () => setOpenEditDialog(true);
  const closePopUp = () => setOpenEditDialog(false);

  function toggleState() {
    let updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, isDone: !task.isDone };
        if (updatedTask.isDone) showHideToast("added to done list");
        else showHideToast("removed from done list");
        return updatedTask;
      }
      return task;
    });
    localStorage.setItem("toDoTasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  const handleSaveEdit = newName => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("toDoTasks", JSON.stringify(updatedTasks));
    showHideToast("Task edited");
  };

  function deleteTask() {
    let updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("toDoTasks", JSON.stringify(updatedTasks));
    showHideToast("task deleted");
  }

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

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

        <IconButton sx={{ color: red[500] }} onClick={handleOpenDeleteDialog}>
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
