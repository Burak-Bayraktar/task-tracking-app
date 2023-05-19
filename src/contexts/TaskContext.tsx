import useDate from "hooks/useDate";
import { createContext, useEffect, useState } from "react";
import { Task, TaskColumn } from "types";
import { convertToTasksWithColumn, filterTasksByDate } from "utils";

type TaskContextType = {
  tasks: Task[];
  dateFilteredTasks: Task[];
  filteredTasks: Task[];
  tasksWithColumns: TaskColumn[];
  manageTasks: (taskModifications: Task[], action: 'add' | 'update' | 'delete') => void;
  filterByDate: (date: string) => void;
  filterBySearchKey: (searchKey: string) => void;
};

const getItemsFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return { tasks };
};

const initialTaskColumns: TaskColumn[] = [
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
];

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  dateFilteredTasks: [],
  filteredTasks: [],
  tasksWithColumns: initialTaskColumns,
  manageTasks() {},
  filterByDate() {},
  filterBySearchKey() {},
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dateFilteredTasks, setDateFilteredTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [tasksWithColumns, setTasksWithColumns] = useState<TaskColumn[]>(initialTaskColumns);

  const { dateAsLocaleDateString } = useDate();

  useEffect(() => {
    const { tasks } = getItemsFromLocalStorage();
    
    if (tasks) {
      const parsedTasks = JSON.parse(tasks) as Task[];

      const filteredByDate = filterTasksByDate(parsedTasks, dateAsLocaleDateString!);
      const result = convertToTasksWithColumn(filteredByDate);

      setTasks(parsedTasks);
      setDateFilteredTasks(filteredByDate);
      setFilteredTasks(filteredByDate);
      setTasksWithColumns(result);
    }
  }, [dateAsLocaleDateString]);

  useEffect(() => {
    filterByDate(dateAsLocaleDateString!);
  }, [dateAsLocaleDateString]);

  const manageTasks = (taskModifications: Task[], action: 'add' | 'update' | 'delete') => {
    let newTasks;
    switch (action) {
      case 'add':
        newTasks = [...tasks, ...taskModifications];
        break;
      case 'update':
        newTasks = tasks.map(task => {
          const updatedTask = taskModifications.find(t => t.id === task.id);
          return updatedTask ? updatedTask : task;
        });
        break;
      case 'delete':
        newTasks = tasks.filter(task => !taskModifications.find(t => t.id === task.id));
        break;
      default:
        newTasks = [...tasks];
    }

    setTasks(newTasks);

    if (newTasks.length === 0) {
      setTasksWithColumns(initialTaskColumns);
      setDateFilteredTasks([]);
    }

    filterByDate(dateAsLocaleDateString!, newTasks);
    updateLocalStorage(newTasks);
  };

  const updateLocalStorage = (
    newTasks: Task[],
  ) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const filterByDate = (date: string, newTasks?: Task[]) => {
    if (!newTasks || newTasks.length === 0) {
      return;
    }

    const filteredTasks = filterTasksByDate(
      newTasks?.length ? newTasks : tasks,
      date
    );
    const convertedTasks = convertToTasksWithColumn(filteredTasks);

    setTasksWithColumns(convertedTasks);
    setDateFilteredTasks(filteredTasks);
  };

  const filterBySearchKey = (searchKey: string) => {
    const newFiltered = dateFilteredTasks.filter(task => task.description.toLowerCase().includes(searchKey.toLowerCase()));
    setTasksWithColumns(convertToTasksWithColumn(newFiltered));
  };

  return (
    <TaskContext.Provider 
      value={{
        tasks,
        dateFilteredTasks,
        filteredTasks,
        tasksWithColumns,
        manageTasks,
        filterByDate,
        filterBySearchKey,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
