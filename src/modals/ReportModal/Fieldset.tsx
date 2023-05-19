import { Task, TaskItemTitle } from "types";

const statuses: TaskItemTitle[] = ["Bug", "Feature", "Refactor"];

type FieldsetProps = {
  index: number;
  reportedTask?: Task;
};

const Fieldset = ({ index, reportedTask }: FieldsetProps) => (
  <fieldset name={`task-fieldset-${index + 1}`} key={reportedTask ? reportedTask.id : `empty-${index}`} data-task-id={reportedTask ? reportedTask.id : ''}>
    <div className="report-row">
      <legend>Field {index + 1}</legend>
      <input type="text" hidden name={`task-id-${index + 1}`} value={reportedTask ? reportedTask.id : ''} />
      <input type="text" hidden name={`task-status-${index + 1}`} value={reportedTask ? `${reportedTask.status.title}-${reportedTask.status.type}` : ''} />
      <select name={`task-type-${index + 1}`} className="task-type">
        {statuses.map((status) => (
          <option
            key={status}
            value={status}
            selected={
              reportedTask &&
              reportedTask.type.title.toLowerCase() === status.toLowerCase()
            }
          >
            {status}
          </option>
        ))}
      </select>
      <textarea
        name={`task-desc-${index + 1}`}
        rows={1}
        defaultValue={reportedTask ? reportedTask.description : ""}
      />
    </div>
  </fieldset>
);

export default Fieldset;
