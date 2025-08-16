import { createContext, useReducer } from "react";
import TaskReducer from "../reducers/TaskReducer";
export const TaskContext = createContext([]);
const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(TaskReducer, []);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskProvider;
