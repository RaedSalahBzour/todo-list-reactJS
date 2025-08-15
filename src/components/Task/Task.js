import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { red, orange } from "@mui/material/colors";
import { useContext } from "react";
import { TaskContext } from "../../contexts/tasksContext";
export default function Task({ id, title, isDone }) {
  const theme = useTheme();
  const { tasks, setTasks } = useContext(TaskContext);
  function toggleState() {
    let updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
  }
  function editTask() {
    const newTask = prompt("New task?", title);
    if (newTask && newTask.trim() !== "") {
      let updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, name: newTask } : task
      );
      setTasks(updatedTasks);
    }
  }
  function deleteTask() {
    let updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
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

        <IconButton sx={{ color: orange[400] }} onClick={editTask}>
          <EditIcon />
        </IconButton>

        <IconButton sx={{ color: red[500] }} onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Stack>
  );
}
