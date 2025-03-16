import styles from "./TaskCard.module.css";
import commentsIcon from "../../assets/Comments.svg";
import { TaskData } from "../../Types";
import { DateConverter } from "../../utils/dateUtils";

export default function TaskCard({ taskData }: { taskData: TaskData }) {
  function getBorerColor() {
    switch (taskData.status.name) {
      case "დასაწყები":
        return "#F7BC30";
      case "პროგრესში":
        return "#FB5607";
      case "მზად ტესტირებისთვის":
        return "#FF006E";
      case "დასრულებული":
        return "#3A86FF";
      default:
        break;
    }
  }

  function getPriorityColor() {
    switch (taskData.priority.name) {
      case "დაბალი":
        return "#08A508";
      case "საშუალო":
        return "##FFBE0B";
      case "მაღალი":
        return "#FA4D4D";
      default:
        break;
    }
  }

  return (
    <div className={styles.taskCard} style={{ borderColor: getBorerColor() }}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <div
            className={styles.priority}
            style={{
              borderColor: getPriorityColor(),
              color: getPriorityColor(),
            }}
          >
            <img src={taskData.priority.icon} />
            <div>{taskData.priority.name}</div>
          </div>
          <div className={styles.department}>{taskData.department.name}</div>
        </div>
        <div className={styles.due}>
          <DateConverter dateString={taskData.due_date} />
        </div>
      </div>
      <div>
        <h4>{taskData.name}</h4>
        <p>{taskData.description}</p>
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
