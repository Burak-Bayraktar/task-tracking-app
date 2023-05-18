import TaskContext from "contexts/TaskContext";
import { useContext } from "react";

export const useTask = () => useContext(TaskContext);