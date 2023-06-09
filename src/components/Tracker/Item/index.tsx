import Author from "components/Tracker/Author";
import Description from "components/Tracker/Description";
import TaskType from "components/Tracker/TaskType";
import { useDrag } from "react-dnd";

type ItemProps = {
  children: React.ReactNode;
  id: string;
  statusId: number;
};

const Item = ({ children, id, statusId }: ItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id, statusId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`item ${isDragging ? '--dragging' : ''}`} data-task-id={id}>
      {children}
    </div>
  );
};

Item.Author = Author;
Item.TaskType = TaskType;
Item.Description = Description;

export default Item;
