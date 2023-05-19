import { TaskItemType } from "types";

type TaskTypeProps = {
    children: React.ReactNode;
    type: TaskItemType;
}

const TaskType = ({ children, type }: TaskTypeProps) => {
  return (
    <div className="task-type" data-type={type.toUpperCase()}>
      <span className="color-square" />
      {children}
    </div>
  )
}

export default TaskType;