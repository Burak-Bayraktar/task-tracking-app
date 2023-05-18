import { createContext, useEffect, useState } from "react";
import { Task, TaskColumn } from "types";

type TaskContextType = {
  tasks: Task[];
  tasksWithColumns: TaskColumn[];
  addTask: (task: Task) => void;
  filterByDate: (date: Date) => void;
  filterBySearchKey: (searchKey: string) => void;
};

const TaskProps: TaskContextType = {
  tasks: [],
  tasksWithColumns: [],
  addTask(task) {
    console.log("addTask", task);
  },
  filterByDate(date) {
    console.log("filterByDate", date);
  },
  filterBySearchKey(searchKey) {
    console.log("search key", searchKey);
  },
};

const getItemsFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  const tasksWithColumns = localStorage.getItem("tasksWithColumns");

  return { tasks, tasksWithColumns };
};

const TaskContext = createContext<TaskContextType>(TaskProps);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksWithColumns, setTasksWithColumns] = useState<TaskColumn[]>([
    {
      title: "Backlog",
      type: "BACKLOG",
      tasks: [],
    },
    {
      title: "In Progress",
      type: "IN_PROGRESS",
      tasks: [],
    },
    {
      title: "Done",
      type: "DONE",
      tasks: [],
    },
  ]);

  useEffect(() => {
    const { tasks, tasksWithColumns } = getItemsFromLocalStorage();

    if (tasks) {
      setTasks(JSON.parse(tasks) as Task[]);
    }

    if (tasksWithColumns) {
      setTasksWithColumns(JSON.parse(tasksWithColumns) as TaskColumn[]);
    }
  }, []);

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    const updatedTasksWithColumns = [...tasksWithColumns];

    const column = updatedTasksWithColumns.find(
      (column) => column.type === task.status.type
    );

    if (column) {
      column.tasks.push(task);
    } else {
      updatedTasksWithColumns.push({
        title: task.status.title,
        type: task.status.type,
        tasks: [task],
      });
    }

    setTasksWithColumns(tasksWithColumns);
    setTasks(newTasks);

    updateLocalStorage(newTasks, updatedTasksWithColumns);
  };

  const updateLocalStorage = (
    newTasks: Task[],
    tasksWithColumns: TaskColumn[]
  ) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    localStorage.setItem("tasksWithColumns", JSON.stringify(tasksWithColumns));
  };

  const filterByDate = (date: Date) => {
    // TODO: filter tasks by date
    console.log("filterByDate", date);
  };

  const filterBySearchKey = (searchKey: string) => {
    // TODO: filter tasks by search key
    console.log("search key", searchKey);
  };

  const values = {
    tasks,
    tasksWithColumns,
    addTask,
    filterByDate,
    filterBySearchKey,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskContext;
