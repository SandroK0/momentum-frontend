import styles from "./TaskCard.module.css";
import commentsIcon from "../../assets/Comments.svg";
import { TaskData } from "../../Types";
import { DateConverter } from "../../utils/dateUtils";
import { useNavigate } from "react-router";
import { getBorerColorViaStatus, getPriorityColor, getDepartmentColor } from "../../utils/colorUtils";

export default function TaskCard({ taskData }: { taskData: TaskData }) {
  const navigate = useNavigate();

  function truncateText(text: string, maxLength: number) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  return (
    <div
      className={styles.taskCard}
      style={{ borderColor: getBorerColorViaStatus(taskData.status.name) }}
      onClick={() => {
        navigate(`/task/${taskData.id}`);
      }}
    >
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <div
            className={styles.priority}
            style={{
              borderColor: getPriorityColor(taskData.priority.name),
              color: getPriorityColor(taskData.priority.name),
            }}
          >
            <img src={taskData.priority.icon} />
            <div>{taskData.priority.name}</div>
          </div>
          <div
            className={styles.department}
            style={{ backgroundColor: getDepartmentColor(taskData.department.name) }}
          >
            {taskData.department.name}
          </div>
        </div>
        <div className={styles.due}>
          <DateConverter dateString={taskData.due_date} />
        </div>
      </div>
      <div>
        <h4>{taskData.name}</h4>
        <p>{taskData.description && truncateText(taskData.description, 100)}</p>
      </div>
      <div className={styles.bottom}>
        <img
          src={taskData.employee.avatar}
          className={styles.avatar}
          alt="avatar"
        />
        <div className={styles.commentInd}>
          <img src={commentsIcon} alt="" />
          <div>{taskData.total_comments}</div>
        </div>
      </div>
    </div>
  );
}
