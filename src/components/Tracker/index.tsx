import Column from "components/Tracker/Column";
import Item from "components/Tracker/Item";
import "components/Tracker/style.css";

type TrackerProps = {
  children: React.ReactNode;
};

const Tracker = ({ children }: TrackerProps) => {
  return <div className="task-tracker-container">{children}</div>;
};

Tracker.Column = Column;
Tracker.Item = Item;

Tracker.Author = Item.Author;
Tracker.TaskType = Item.TaskType;
Tracker.Description = Item.Description;

export default Tracker;
