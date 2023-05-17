type TaskTrackingColumnType = "BACKLOG" | "IN_PROGRESS" | "DONE";
type TaskTrackingColumnTitle = "Backlog" | "In Progress" | "Done";

type TaskItemType = "BUG" | "FEATURE" | "REFACTOR";
type TaskItemTitle = "Bug" | "Feature" | "Refactor";

type Author = {
    id: number;
    img: string;
    name: string;
    title: string;
};

type Task = {
    id: number;
    author: Author;
    description: string;
    type: TaskType;
    status: {
        id: number;
        title: TaskTrackingColumnTitle;
        type: TaskTrackingColumnType;
    },
    updatedAt?: Date;
    createdAt: Date;
};

type TaskType = {
    id: number;
    title: TaskItemTitle;
    type: TaskItemType;
};

type TaskColumn = {
    title: TaskTrackingColumnTitle;
    tasks: Task[];
    type: TaskTrackingColumnType;
};

export type {
    TaskTrackingColumnType,
    TaskTrackingColumnTitle,
    Author,
    Task,
    TaskColumn,
};
