import { TaskTrackingColumnTitle, TaskTrackingColumnType } from "types";

type ColumnProps = {
  children: React.ReactNode;
  title: TaskTrackingColumnTitle;
  type: TaskTrackingColumnType;
};

const Column = ({ children, title, type }: ColumnProps) => {
  return (
    <div className="column" data-column-type={type}>
      <h2 className="title">{title}</h2>
      {children}
    </div>
  );
};

export default Column;
