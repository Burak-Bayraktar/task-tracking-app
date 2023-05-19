import Tracker from "components/Tracker";
import { useTask } from "hooks/useTask";
import EmptyTaskTrackingSection from "./EmptyTaskTrackingSection";

const TaskTrackingSection = () => {
  const { tasksWithColumns } = useTask();

  if (tasksWithColumns.length === 0) {
    return <EmptyTaskTrackingSection />;
  }

  return (
    <section>
      <Tracker>
        {tasksWithColumns.map((taskColumn) => {
          return (
            <Tracker.Column
              key={taskColumn.type}
              title={taskColumn.title}
              type={taskColumn.type}
            >
              <div className="column-content">
                {taskColumn.tasks.map((task) => {
                  console.log(task)
                  return (
                    <Tracker.Item
                      key={task.id}
                      id={task.id}
                      statusId={task.status.id}
                    >
                      <Tracker.Item.Author>
                        <div className="author-left">
                          <img src={task.author.img} alt="author-image" />
                        </div>
                        <div className="author-right">
                          <div className="author-name">{task.author.name}</div>
                          <div className="author-title">
                            {task.author.title}
                          </div>
                        </div>
                      </Tracker.Item.Author>
                      <Tracker.Item.Description>
                        {task.description}
                      </Tracker.Item.Description>
                      <Tracker.Item.TaskType type={task.type.type}>
                        {task.type.title}
                      </Tracker.Item.TaskType>
                    </Tracker.Item>
                  );
                })}
              </div>
            </Tracker.Column>
          );
        })}
      </Tracker>
    </section>
  );
};

export default TaskTrackingSection;
