import { useState, useEffect } from "react";
import { Container, Button, ButtonGroup, TextField, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Task from "../Task/Task";
import { TaskContext } from "../../contexts/tasksContext";
import { v4 as uuidv4 } from "uuid";
export default function Main() {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("toDoTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addToTasks = () => {
    let newTasks = [...tasks, { id: uuidv4(), name: inputVal, isDone: false }];
    setTasks(newTasks);
    localStorage.setItem("toDoTasks", JSON.stringify(newTasks));
    setInputVal("");
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter(task => task.isDone)
      : tasks.filter(task => !task.isDone);

  const filteredTasksList = filteredTasks.map(task => (
    <Task key={task.id} id={task.id} title={task.name} isDone={task.isDone} />
  ));

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
          <Button onClick={() => setFilter("all")}>All</Button>
          <Button onClick={() => setFilter("completed")}>Done</Button>
          <Button onClick={() => setFilter("toDo")}>To Do</Button>
        </ButtonGroup>

        {filteredTasks.length > 0 ? filteredTasksList : <h2>No tasks</h2>}

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
          <Button
            disabled={!inputVal}
            variant="contained"
            size="small"
            onClick={addToTasks}
          >
            Add
          </Button>
        </Box>
      </Container>
    </TaskContext.Provider>
  );
}
