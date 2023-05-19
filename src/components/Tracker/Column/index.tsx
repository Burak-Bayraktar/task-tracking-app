import { useTask } from "hooks/useTask";
import { useDrop } from "react-dnd";
import { TaskTrackingColumnTitle, TaskTrackingColumnType } from "types";

type ColumnProps = {
  children: React.ReactNode;
  title: TaskTrackingColumnTitle;
  type: TaskTrackingColumnType;
};

const Column = ({ children, title, type }: ColumnProps) => {
  const { tasks, manageTasks } = useTask();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string, statusId: number }) => addItemToColumn(item),
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      };
    },
  }), [tasks]);

  const addItemToColumn = (item: { id: string, statusId: number }) => {
    const task = tasks.find(task => task.id === item.id);
    if (!task) return;
  
    const updatedTask = {
      ...task,
      status: {
        id: item.statusId,
        title: title,
        type: type,
      },
    };

    manageTasks([updatedTask], 'update');
  };

  return (
    <div className={`column ${isOver ? 'drag-over' : ''}`} data-column-type={type} ref={drop}>
      <h2 className="title">{title}</h2>
      {children}
    </div>
  );
};

export default Column;
