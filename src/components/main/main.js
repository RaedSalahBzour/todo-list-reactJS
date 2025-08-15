import { useState } from "react";
import { Container, Button, ButtonGroup, TextField, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Task from "../Task/Task";
import { TaskContext } from "../../contexts/tasksContext";
export default function Main() {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const addToTasks = () => {
    if (inputVal.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), name: inputVal, isDone: false }]);
      setInputVal("");
    }
  };

  const taskList = tasks.map(task => (
    <Task key={task.id} id={task.id} title={task.name} isDone={task.isDone} />
  ));
  function allTasks() {
    setTasks(tasks);
  }
  function done() {
    const newTasks = tasks.filter(task => task.isDone === true);
    setTasks(newTasks);
  }
  function toDo() {
    const newTasks = tasks.filter(task => task.isDone === false);
    setTasks(newTasks);
  }
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <Container
        maxWidth="lg"
        style={{
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "20px",
          marginTop: "20%",
          textAlign: "center",
        }}
      >
        <h1>To Do</h1>

        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          style={{ margin: "10px" }}
        >
          <Button onClick={allTasks}>All</Button>
          <Button onClick={done}>Done</Button>
          <Button onClick={toDo}>To Do</Button>
        </ButtonGroup>

        {tasks.length > 0 ? taskList : <h2>No tasks yet</h2>}

        <Box
          component="form"
          sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            id="outlined-basic"
            label="New task"
            variant="outlined"
            size="small"
          />
          <Button variant="contained" size="small" onClick={addToTasks}>
            Add
          </Button>
        </Box>
      </Container>
    </TaskContext.Provider>
  );
}
