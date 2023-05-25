import { DateTime } from "luxon";
import { Task, TaskColumn } from "types";

const convertToTasksWithColumn = (tasks: Task[]) => {
  const columns: TaskColumn[] = [
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

  tasks.forEach((task) => {
    const column = columns.find((column) => column.type === task.status.type);
    if (column) {
      column.tasks.push(task);
    }
  });

  return columns;
};

const filterTasksByDate = (tasks: Task[], date: string) => {
  const filteredTasks = tasks.filter((task) => {
    const convertedTaskDate = new Date(task.createdAt).toLocaleDateString(
      "tr-TR"
    );
    return convertedTaskDate === date;
  });

  return filteredTasks;
};

const filterTasksByUser = (tasks: Task[], userId: string) => {
  const filteredTasks = tasks.filter((task) => {
    return task.author.id === userId;
  });

  return filteredTasks;
};

const getIsoDate = (dateStr: string) => {
  return DateTime.fromFormat(dateStr, 'yyyy-M-d', { locale: 'tr' }).toISODate();
}

export { convertToTasksWithColumn, filterTasksByDate, filterTasksByUser, getIsoDate };
