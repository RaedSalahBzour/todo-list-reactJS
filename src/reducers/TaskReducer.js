import { v4 as uuidv4 } from "uuid";
export default function TaskReducer(currentTasks, action) {
  switch (action.type) {
    case "init": {
      return action.payload;
    }
    case "add": {
      let newTasks = [
        ...currentTasks,
        { id: uuidv4(), name: action.payload.title, isDone: false },
      ];
      localStorage.setItem("toDoTasks", JSON.stringify(newTasks));
      return newTasks;
    }
    case "toggle": {
      const updatedTasks = currentTasks.map(task =>
        task.id === action.payload.id ? { ...task, isDone: !task.isDone } : task
      );
      localStorage.setItem("toDoTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "edit": {
      const updatedTasks = currentTasks.map(task =>
        task.id === action.payload.id
          ? { ...task, name: action.payload.name }
          : task
      );
      localStorage.setItem("toDoTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "delete": {
      const updatedTasks = currentTasks.filter(
        task => task.id !== action.payload.id
      );
      localStorage.setItem("toDoTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    default: {
      throw Error("unknown action");
    }
  }
}
