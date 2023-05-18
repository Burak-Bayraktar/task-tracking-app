import { createContext, useContext, useState } from "react";
import { Task } from "types";

type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
};

const TaskProps: TaskContextType = {
    tasks: [],
    addTask(task) {
        this.tasks.push(task);
    },
};

const TaskContext = createContext<TaskContextType>(TaskProps);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const filterByDate = (date: Date) => {
        // TODO: filter tasks by date
        console.log('filterByDate', date)
    }

    const filterBySearchKey = (searchKey: string) => {
        // TODO: filter tasks by search key
        console.log('search key', searchKey);
    }

    const values = {
        tasks,
        addTask,
        filterByDate,
        filterBySearchKey,
    }

    return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
}

export default TaskContext;