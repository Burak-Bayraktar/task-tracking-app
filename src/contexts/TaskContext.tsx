import useDate from "hooks/useDate";
import { createContext, useEffect, useState } from "react";
import { Task, TaskColumn } from "types";
import { convertToTasksWithColumn } from "utils";

type TaskContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  tasksWithColumns: TaskColumn[];
  addTask: (task: Task) => void;
  filterByDate: (date: string) => void;
  filterBySearchKey: (searchKey: string) => void;
};

const TaskProps: TaskContextType = {
  tasks: [],
  filteredTasks: [],
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
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
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

  const { dateAsLocaleDateString } = useDate();

  useEffect(() => {
    const { tasks, tasksWithColumns } = getItemsFromLocalStorage();

    if (tasks) {
      setTasks(JSON.parse(tasks) as Task[]);
      setFilteredTasks(JSON.parse(tasks) as Task[]);
    }

    if (tasksWithColumns) {
      setTasksWithColumns(JSON.parse(tasksWithColumns) as TaskColumn[]);
    }
  }, []);

  useEffect(() => {
    filterByDate(dateAsLocaleDateString!);
  }, [dateAsLocaleDateString]);

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

  const filterByDate = (date: string) => {
    if (tasks.length === 0) {
      return;
    }

    // TODO: filter tasks by date
    const filteredTasks = tasks.filter((task) => {
      const convertedTaskDate = new Date(task.createdAt).toLocaleDateString(
        "tr-TR"
      );
      return convertedTaskDate === date;
    });

    const convertedTasks = convertToTasksWithColumn(filteredTasks);

    console.info(`Tasks filtered by date: ${date}`, filteredTasks);
    console.info(
      `Tasks with columns filtered by date: ${date}`,
      convertedTasks
    );

    setTasksWithColumns(convertedTasks);
    setFilteredTasks(filteredTasks);
  };

  const filterBySearchKey = (searchKey: string) => {
    // TODO: filter tasks by search key
    console.log("search key", searchKey);
  };

  const values = {
    tasks,
    filteredTasks,
    tasksWithColumns,
    addTask,
    filterByDate,
    filterBySearchKey,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskContext;
