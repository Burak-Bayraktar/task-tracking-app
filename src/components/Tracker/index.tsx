import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Column from "components/Tracker/Column";
import Item from "components/Tracker/Item";
import "components/Tracker/style.css";

type TrackerProps = {
  children: React.ReactNode;
};

const Tracker = ({ children }: TrackerProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-tracker-container">{children}</div>
    </DndProvider>
  );
};

Tracker.Column = Column;
Tracker.Item = Item;

Tracker.Author = Item.Author;
Tracker.TaskType = Item.TaskType;
Tracker.Description = Item.Description;

export default Tracker;
