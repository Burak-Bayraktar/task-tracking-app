import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskItemTitle, TaskItemType, TaskTrackingColumnTitle, TaskTrackingColumnType } from "types";
import { useModal } from "hooks/useModal";
import { useTask } from "hooks/useTask";
import useUser from "hooks/useUser";
import useDate from "hooks/useDate";
import { filterTasksByDate, filterTasksByUser } from "utils";
import Fieldset from "modals/ReportModal/Fieldset";
import "modals/ReportModal/style.css";

const ReportModal = () => {
  const { manageTasks, filteredTasks, dateFilteredTasks } = useTask();
  const { removeModal } = useModal();
  const { activeUser } = useUser();
  const { date, dateAsLocaleDateString } = useDate();
  const [reportedTasks, setReportedTasks] = useState<Task[]>();

  const DAILY_REPORT_LIMIT = 3;

  useEffect(() => {
    // TODO: don't forget to add cleanup and remove the event listener.
    // TODO: also, this is not a good practice, don't use querySelectorAll.
    // TODO: instead, use useRef and pass the ref to the textarea.
    document.querySelectorAll(".report-row textarea")?.forEach((textarea) => {
      textarea.addEventListener("input", function (this: HTMLTextAreaElement) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    });
  }, []);

  useEffect(() => {
    if (activeUser) {
      const filteredTasksByUser = filterTasksByUser(
        dateFilteredTasks || filteredTasks,
        activeUser.id
      );

      const filteredTasksByDate = filterTasksByDate(filteredTasksByUser, dateAsLocaleDateString!);

      setReportedTasks(filteredTasksByDate);
    }
  }, [activeUser?.id]);

  const closeModal = () => {
    removeModal("Report");
  };

  let receivedTasks: { type: 'ADD' | 'REMOVE' | 'UPDATE', task: Task }[] = [];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activeUser) {
      alert("Please select a user to continue reporting.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    for (let i = 0; i < DAILY_REPORT_LIMIT; i++) {
      const taskType = formData.get(`task-type-${i + 1}`) as TaskItemTitle;
      const taskDesc = formData.get(`task-desc-${i + 1}`) as string;
      const taskId = formData.get(`task-id-${i + 1}`) as string;
      const taskStatus = formData.get(`task-status-${i + 1}`) as string;
      const taskStatusTitle = taskStatus?.split('-')[0] as TaskTrackingColumnTitle;
      const taskStatusType = taskStatus?.split('-')[1] as TaskTrackingColumnType;

      let shouldUpdate = false;

      if (reportedTasks?.length) {
        shouldUpdate = reportedTasks[i]?.description !== taskDesc || reportedTasks[i]?.type.title !== taskType;
      }
      
      if (taskId && shouldUpdate) {
        receivedTasks = [...receivedTasks, { type: 'UPDATE', task: {
          id: taskId,
          description: taskDesc,
          status: {
            id: 1,
            title: taskStatusTitle,
            type: taskStatusType,
          },
          type: {
            id: 1,
            title: taskType,
            type: taskType as TaskItemType,
          },
          updatedAt: date ? new Date(date) : new Date(),
          createdAt: date ? new Date(date) : new Date(),
          author: activeUser,
        }}];
      }

      if (!taskId && taskDesc) {
        receivedTasks = [...receivedTasks, { type: 'ADD', task: {
          id: uuidv4(),
          description: taskDesc,
          status: {
            id: 1,
            title: 'Backlog',
            type: 'BACKLOG',
          },
          type: {
            id: 1,
            title: taskType,
            type: taskType as TaskItemType,
          },
          updatedAt: date ? new Date(date) : new Date(),
          createdAt: date ? new Date(date) : new Date(),
          author: activeUser,
        }}];
      }

      if (!taskDesc && taskId) {
        receivedTasks = [...receivedTasks, { type: 'REMOVE', task: {
          id: taskId,
          description: taskDesc,
          status: {
            id: 1,
            title: taskStatusTitle,
            type: taskStatusType,
          },
          type: {
            id: 1,
            title: taskType,
            type: taskType as TaskItemType,
          },
          updatedAt: date ? new Date(date) : new Date(),
          createdAt: date ? new Date(date) : new Date(),
          author: activeUser,
        }}];
      }
    }

    const tasksAdded = receivedTasks.filter(task => task.type === 'ADD').map(task => task.task);
    const tasksRemoved = receivedTasks.filter(task => task.type === 'REMOVE').map(task => task.task);
    const tasksUpdated = receivedTasks.filter(task => task.type === 'UPDATE').map(task => task.task);

    if (tasksAdded.length) {
      manageTasks(tasksAdded, 'add');
    }
    
    if (tasksUpdated.length) {
      manageTasks(tasksUpdated, 'update');
    }

    if (tasksRemoved.length) {
      manageTasks(tasksRemoved, 'delete');
    }
  
    closeModal();
  };

  return (
    <dialog open className="report-modal">
      <header>
        <h1 className="title">Report Your Daily Tasks</h1>
        <div className="close-icon" onClick={closeModal} />
        <p className="description">
          Please report your daily tasks below. You should enter the task type,
          task name, and estimated time you will spent on the task. You can also
          add a comments, but please keep them concise.
        </p>
      </header>
      <form action="post" onSubmit={handleSubmit}>
        {new Array(DAILY_REPORT_LIMIT)
          .fill("")
          .map((_, index) =>
            reportedTasks && reportedTasks[index] ? (
              <Fieldset key={reportedTasks[index].id} index={index} reportedTask={reportedTasks[index]} />
            ) : (
              <Fieldset key={index} index={index} />
            )
          )}
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </dialog>
  );
};

export default ReportModal;