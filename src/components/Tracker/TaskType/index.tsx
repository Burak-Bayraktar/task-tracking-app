type TaskTypeProps = {
    children: React.ReactNode;
}

const TaskType = ({ children }: TaskTypeProps) => {
  return (
    <div className="task-type">{children}</div>
  )
}

export default TaskType;