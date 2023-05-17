import { useDrop } from "react-dnd";
import { TaskTrackingColumnTitle, TaskTrackingColumnType } from "types";

type ColumnProps = {
  children: React.ReactNode;
  title: TaskTrackingColumnTitle;
  type: TaskTrackingColumnType;
};

const Column = ({ children, title, type }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number, statusId: number }) => addItemToColumn(item),
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      };
    },
  }));

  const addItemToColumn = (item: { id: number, statusId: number }) => {
    console.log(item);
  };

  return (
    <div className={`column ${isOver ? 'drag-over' : ''}`} data-column-type={type} ref={drop}>
      <h2 className="title">{title}</h2>
      {children}
    </div>
  );
};

export default Column;
