import { useEffect } from "react";
import { useTask } from "hooks/useTask";
import { TaskTrackingColumnTitle, TaskItemTitle, TaskItemType } from "types";
import "modals/ReportModal.css";
import { useModal } from "hooks/useModal";

const statuses: TaskTrackingColumnTitle[] = ["Backlog", "In Progress", "Done"];

const ReportModal = () => {
  const { addTask } = useTask();
  const { removeModal } = useModal();

  useEffect(() => {
    document.querySelectorAll(".report-row textarea")?.forEach((textarea) => {
      textarea.addEventListener("input", function (this: HTMLTextAreaElement) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitted");
  };



  const closeModal = () => {
    removeModal('Report');
  }

  return (
    <dialog open className="report-modal">
      <header>
        <h1 className="title">Report Your Daily Tasks</h1>
        <span className="close-icon" onClick={closeModal}>X</span>
        <p className="description">
          Please report your daily tasks below. You should enter the task type,
          task name, and estimated time you will spent on the task. You can also
          add a comments, but please keep them concise.
        </p>
      </header>
      <form action="post" onSubmit={handleSubmit}>
        {[1, 2, 3].map((i) => (
          <fieldset>
            <div className="report-row">
              <legend>Field {i}</legend>
              <select name={`task-type-${i}`} className="task-type">
                {statuses.map((status) => (
                  <option value={status.toLowerCase()}>{status}</option>
                ))}
              </select>
              <textarea name={`task-desc-${i}`} rows={1}></textarea>
            </div>
          </fieldset>
        ))}
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </dialog>
  );
};

export default ReportModal;
