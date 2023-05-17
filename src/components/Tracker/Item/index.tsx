import Author from "components/Tracker/Author";
import Description from "components/Tracker/Description";
import TaskType from "components/Tracker/TaskType";

type ItemProps = {
  children: React.ReactNode;
  id: number
};

const Item = ({ children, id }: ItemProps) => {

  return <div className="item" data-task-id={id}>{children}</div>;
};


Item.Author = Author;
Item.TaskType = TaskType;
Item.Description = Description;

export default Item;
