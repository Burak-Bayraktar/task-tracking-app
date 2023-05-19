/* eslint-disable @typescript-eslint/no-empty-function */
import { Task } from "types";
import Select from "react-select";

type FieldsetProps = {
  index: number;
  reportedTask?: Task;
};

const Fieldset = ({ index, reportedTask }: FieldsetProps) => {
  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    event.currentTarget.style.height = "auto";
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
  };

  return (
    <fieldset
      name={`task-fieldset-${index + 1}`}
      key={reportedTask ? reportedTask.id : `empty-${index}`}
      data-task-id={reportedTask ? reportedTask.id : ""}
    >
      <div className="report-row">
        <legend>Field {index + 1}</legend>
        <input
          type="text"
          hidden
          onChange={() => {}}
          name={`task-id-${index + 1}`}
          value={reportedTask ? reportedTask.id : undefined}
        />
        <input
          type="text"
          hidden
          onChange={() => {}}
          name={`task-status-${index + 1}`}
          value={
            reportedTask
              ? `${reportedTask.status.title}-${reportedTask.status.type}`
              : undefined
          }
        />
        <Select
          onChange={() => {}}
          options={[
            { value: "Bug", label: "Bug" },
            { value: "Feature", label: "Feature" },
            { value: "Refactor", label: "Refactor" },
          ]}
          styles={{
            control: (provided, state) => ({
              ...provided,
              width: "178px",
              maxWidth: "100%",
              height: "40px",
              boxShadow: "none",
              borderBlock: "1px solid #E5E5E5",
              borderLeft: "1px solid #E5E5E5",
              borderRight: "1px solid #E5E5E5",
              borderRadius: "6px",
              marginRight: "16px",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
            option: (provided, state) => {
              let color;

              switch (state.data.value?.toUpperCase()) {
                case "BUG":
                  color = "#F32E2E";
                  break;
                case "FEATURE":
                  color = "#56B969";
                  break;
                case "REFACTOR":
                  color = "#E034CF";
                  break;
                default:
                  color = "#000";
                  break;
              }

              return {
                ...provided,
                alignItems: "center",
                display: "flex",
                height: "28px",
                ":before": {
                  backgroundColor: color,
                  borderRadius: 10,
                  content: '" "',
                  display: "block",
                  marginRight: 8,
                  height: 10,
                  width: 10,
                },
              };
            },
            singleValue: (provided, state) => {
              let squareColor;
              let textColor = "#000";

              switch (state.getValue()[0].value?.toUpperCase()) {
                case "BUG":
                  squareColor = "#F32E2E";
                  break;
                case "FEATURE":
                  squareColor = "#56B969";
                  break;
                case "REFACTOR":
                  squareColor = "#E034CF";
                  break;
                default:
                  squareColor = "transparent";
                  textColor = "#9EA9B2";
                  break;
              }

              return {
                ...provided,
                alignItems: "center",
                display: "flex",
                color: textColor,
                fontSize: "12px",
                ":before": {
                  backgroundColor: squareColor,
                  borderRadius: 10,
                  content: '" "',
                  display: "block",
                  marginRight: 8,
                  height: 10,
                  width: 10,
                },
              };
            },
          }}
          defaultValue={{
            value: reportedTask ? reportedTask.type.title : null,
            label: reportedTask ? reportedTask.type.title : "Type",
          }}
          name={`task-type-${index + 1}`}
        />

        <textarea
          name={`task-desc-${index + 1}`}
          rows={1}
          onChange={handleInput}
          defaultValue={reportedTask ? reportedTask.description : ""}
        />
      </div>
    </fieldset>
  );
};

export default Fieldset;
