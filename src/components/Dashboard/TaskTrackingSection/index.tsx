import Tracker from "components/Tracker";
import { TaskColumn } from "types";

// TODO: Replace this with actual data
const taskArrayWithColumns: TaskColumn[] = [
  {
    title: "Backlog",
    tasks: [
      {
        id: 1,
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          img: "",
        },
        description: "Create a new project using React and TypeScript",
        type: {
          id: 1,
          title: "Feature",
          type: "FEATURE",
        },
        status: {
          id: 1,
          title: "Backlog",
          type: "BACKLOG",
        },
        createdAt: new Date(),
      },
      {
        id: 2,
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          img: "",
        },
        description: "Create a new project using React and TypeScript",
        type: {
          id: 1,
          title: "Feature",
          type: "FEATURE",
        },
        status: {
          id: 1,
          title: "Backlog",
          type: "BACKLOG",
        },
        createdAt: new Date(),
      },
    ],
    type: "BACKLOG",
  },
  {
    title: "In Progress",
    tasks: [
      {
        id: 3,
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          img: "",
        },
        description: "Create a new project using React and TypeScript",
        type: {
          id: 1,
          title: "Feature",
          type: "FEATURE",
        },
        status: {
          id: 1,
          title: "In Progress",
          type: "IN_PROGRESS",
        },
        createdAt: new Date(),
      },
      {
        id: 4,
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          img: "",
        },
        description: "Create a new project using React and TypeScript",
        type: {
          id: 1,
          title: "Feature",
          type: "FEATURE",
        },
        status: {
          id: 1,
          title: "In Progress",
          type: "IN_PROGRESS",
        },
        createdAt: new Date(),
      },
    ],
    type: "IN_PROGRESS",
  },
  {
    title: "Done",
    tasks: [
      {
        id: 5,
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          img: "",
        },
        description: "Create a new project using React and TypeScript",
        type: {
          id: 1,
          title: "Feature",
          type: "FEATURE",
        },
        status: {
          id: 1,
          title: "Done",
          type: "DONE",
        },
        createdAt: new Date(),
      },
      {
        id: 6,
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          img: "",
        },
        description: "Create a new project using React and TypeScript",
        type: {
          id: 1,
          title: "Feature",
          type: "FEATURE",
        },
        status: {
          id: 1,
          title: "Done",
          type: "DONE",
        },
        createdAt: new Date(),
      },
    ],
    type: "DONE",
  },
];

const TaskTrackingSection = () => {
  return (
    <section>
      <Tracker>
        {taskArrayWithColumns.map((taskColumn) => {
          return (
            <Tracker.Column title={taskColumn.title} type={taskColumn.type}>
              <div className="column-content">
                {taskColumn.tasks.map((task) => {
                  return (
                    <Tracker.Item key={task.id} id={task.id}>
                      <Tracker.Item.Author>
                        {task.author.name}
                      </Tracker.Item.Author>
                      <Tracker.Item.Description>
                        {task.description}
                      </Tracker.Item.Description>
                      <Tracker.Item.TaskType>
                        {task.status.title}
                      </Tracker.Item.TaskType>
                    </Tracker.Item>
                  );
                })}
              </div>
            </Tracker.Column>
          );
        })}
      </Tracker>
    </section>
  );
};

export default TaskTrackingSection;
