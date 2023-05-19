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
            <Tracker.Column key={taskColumn.type} title={taskColumn.title} type={taskColumn.type}>
              <div className="column-content">
                {taskColumn.tasks.map((task) => {
                  return (
                    <Tracker.Item key={task.id} id={task.id} statusId={task.status.id}>
                      <Tracker.Item.Author>
                        {task.author.name}
                      </Tracker.Item.Author>
                      <Tracker.Item.Description>
                        {task.description}
                      </Tracker.Item.Description>
                      <Tracker.Item.TaskType>
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
