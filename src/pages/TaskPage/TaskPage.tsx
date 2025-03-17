import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTask, putTaskStatus } from "../../api/api";
import { Status, TaskData } from "../../Types";
import { getPriorityColor, getDepartmentColor } from "../../utils/colorUtils";
import styles from "./TaskPage.module.css";
import employeeIcon from "../../assets/employee.svg";
import calendarIcon from "../../assets/calendar.svg";
import statusIcon from "../../assets/pie-chart.svg";
import { DateConverter } from "../../utils/dateUtils";
import Select, { SingleValue } from "react-select";
import { useTaskFormData } from "../../utils/useTaskFormData";
import { OptionProps } from "react-select";
import CommentSection from "../../components/CommentSection/CommentSection";

const StatusOption = ({
  data,
  innerRef,
  innerProps,
}: OptionProps<Status, false>) => {
  return (
    <div ref={innerRef} {...innerProps} className={styles.optionStyle}>
      <span>{data.name}</span>
    </div>
  );
};

export default function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<TaskData | null>(null);
  const { statuses } = useTaskFormData();
  const [statusId, setStatusId] = useState<number>(-1);

  async function getTaskData() {
    try {
      const data = await getTask(Number(id));
      setTask(data);
    } catch (error) {
      console.log("Error fetching task", error);
    }
  }

  useEffect(() => {
    if (task) {
      setStatusId(task.status.id);
    }
  }, [task]);

  useEffect(() => {
    getTaskData();
  }, []);

  async function updateStatus(status_id: number) {
    if (statusId === -1) {
      return;
    }

    try {
      await putTaskStatus(Number(id), status_id);
    } catch (error) {
      console.log("Error changing task status", error);
    }
  }

  const selectStyles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      height: "45px",
      padding: "0",
    }),
    container: (baseStyles: any) => ({
      ...baseStyles,
      width: "260px",
    }),
    valueContainer: (baseStyles: any) => ({
      ...baseStyles,
      padding: "0",
    }),
    indicatorSeparator: (baseStyles: any) => ({
      ...baseStyles,
      display: "none",
    }),
  };

  if (task) {
    return (
      <div>
        <div className={styles.top}>
          <div
            className={styles.priority}
            style={{
              borderColor: getPriorityColor(task.priority.name),
              color: getPriorityColor(task.priority.name),
            }}
          >
            <img src={task.priority.icon} />
            <div>{task.priority.name}</div>
          </div>
          <div
            className={styles.department}
            style={{
              backgroundColor: getDepartmentColor(task.department.name),
            }}
          >
            {task.department.name}
          </div>
        </div>
        <div className={styles.cont}>
          <div className={styles.taskData}>
            <h1>{task.name}</h1>
            <p className={styles.desc}>{task.description}</p>
            <div className={styles.details}>
              <div className={styles.row}>
                <div className={styles.left}>
                  <img src={statusIcon} />
                  <div>სტატუსი</div>
                </div>
                <div>
                  <Select<Status>
                    options={statuses}
                    value={statuses.find((s) => s.id === statusId)}
                    getOptionValue={(option: Status) => String(option.id)}
                    getOptionLabel={(option: Status) => option.name}
                    isSearchable={false}
                    onChange={(val: SingleValue<Status>) => {
                      if (val) {
                        setStatusId(val.id);
                        updateStatus(val.id);
                      }
                    }}
                    formatOptionLabel={(option: Status) => (
                      <div className={styles.optionStyle}>{option.name}</div>
                    )}
                    styles={selectStyles}
                    components={{ Option: StatusOption }}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.left}>
                  <img src={employeeIcon} />
                  <div>თანამშრომელი</div>
                </div>
                <div className={styles.employee}>
                  <img src={task.employee.avatar} className={styles.avatar} />{" "}
                  <div>
                    <p>{task.employee.department.name}</p>
                    <div>
                      {task.employee.name} {task.employee.surname}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.left}>
                  <img src={calendarIcon} />
                  <div>დავალების ვადა</div>
                </div>
                <div className={styles.date}>
                  {" "}
                  <DateConverter dateString={task.due_date} />
                </div>
              </div>
            </div>
          </div>
          <CommentSection taskId={Number(id)}></CommentSection>
        </div>
      </div>
    );
  }
}
