import Tracker from "components/Tracker";
import { TaskTrackingColumnTitle, TaskTrackingColumnType } from "types";

type EmptyTaskTrackingSectionProps = {
    name: TaskTrackingColumnTitle,
    type: TaskTrackingColumnType,
};

const EmptyTaskTrackingSection = () => {
  const taskColumns: EmptyTaskTrackingSectionProps[] = [
    {
        name: "Backlog",
        type: "BACKLOG",
    },
    {
        name: "In Progress",
        type: "IN_PROGRESS",
    },
    {
        name: "Done",
        type: "DONE",
    },
  ];

  return (
    <Tracker>
      {taskColumns.map((column) => (
        <Tracker.Column key={column.type} title={column.name} type={column.type}>{null}</Tracker.Column>
      ))}
    </Tracker>
  );
};

export default EmptyTaskTrackingSection;
