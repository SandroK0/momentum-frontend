import { useEffect, useState } from "react";
import styles from "./CreateTaskPage.module.css";
import { Department, Employee, Priority, Status } from "../../Types";
import {
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
} from "../../api/api";

interface ValidationErrors {
  minLength: boolean;
  maxLength: boolean;
}

export default function CreateTaskPage() {
  const [departmentsData, setDepartmentsData] = useState<Array<Department>>([]);
  const [statusData, setStatusData] = useState<Array<Status>>([]);
  const [priorityData, setPriorityData] = useState<Array<Priority>>([]);
  const [employeeData, setEmployeeData] = useState<Array<Employee>>([]);
  const [title, setTitle] = useState<string>("");
  const [titleErrors, setTitleErrors] = useState<ValidationErrors>({
    minLength: false,
    maxLength: false,
  });
  const [description, setDescription] = useState<string>("");

  const [department, setDepartment] = useState<number>(-1);
  const [employee, setEmployee] = useState<number>(-1);
  const [priority, setPriority] = useState<number>(-1);
  const [status, setStatus] = useState<number>(-1);

  async function getDepartmentsData() {
    try {
      const data = await getDepartments();
      setDepartmentsData(data);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getEmployeeData() {
    try {
      const data = await getEmployees();
      setEmployeeData(data);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getPriorityData() {
    try {
      const data = await getPriorities();
      setPriorityData(data);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getStatusData() {
    try {
      const data = await getStatuses();
      setStatusData(data);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDepartmentsData();
    getStatusData();
    getPriorityData();
    getEmployeeData();
  }, []);

  const validate = (value: string): ValidationErrors => {
    if (!value) {
      return {
        minLength: false,
        maxLength: false,
      };
    }

    return {
      minLength: value.length < 3,
      maxLength: value.length > 255,
    };
  };

  const handleTitleChange = (value: string) => {
    const errors = validate(value);
    setTitleErrors(errors);
  };

  const correct = { color: "#08A508" };

  const isDisabled = (): boolean => {
    if (titleErrors.maxLength || titleErrors.minLength) {
      return true;
    }

    if (department === -1 || !title) {
      return true;
    }

    return false;
  };

  return (
    <div className={styles.createTaskPage}>
      <h1>შექმენი ახალი დავალება</h1>
      <div className={styles.taskFormCont}>
        <div className={styles.taskForm}>
          <div className={styles.inputColumn}>
            <div className={styles.inputCont}>
              <label htmlFor="title" className={styles.label}>
                სათაური*
              </label>
              <input
                type="text"
                id="title"
                name="სათაური"
                value={title}
                className={styles.titleInput}
                onChange={(e) => {
                  setTitle(e.target.value);
                  handleTitleChange(e.target.value);
                }}
              />
              <p
                className={styles.reqField}
                style={!titleErrors.minLength && title ? correct : {}}
              >
                მინიმუმ 3 სიმბოლო
              </p>
              <p
                className={styles.reqField}
                style={!titleErrors.maxLength && title ? correct : {}}
              >
                მაქსუმუმ 255 სიმბოლო
              </p>
            </div>
            <div className={styles.inputCont}>
              <label htmlFor="desc" className={styles.label}>
                არწერა
              </label>
              <textarea
                name="description"
                id="desc"
                className={styles.textArea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <p className={styles.reqField}>მინიმუმ 4 სიტყვა</p>
              <p className={styles.reqField}>მაქსიმუმ 255 სიმბოლო</p>
            </div>
            <div className={styles.selectInputs}>
              <div>
                <label className={styles.label}>პრიორიტეტი*</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                >
                  <option value={-1} disabled selected>
                    აირჩიეთ პრიორიტეტი
                  </option>
                  {priorityData.map((prior) => (
                    <option value={prior.id} key={prior.id}>
                      <img src={prior.icon} />
                      {prior.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={styles.label}>სტატუსი*</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                >
                  <option value={-1} disabled selected>
                    აირჩიეთ სტატუსი
                  </option>
                  {statusData.map((stat) => (
                    <option value={stat.id} key={stat.id}>
                      {stat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.inputColumn}>
            <div className={styles.inputCont}>
              <label htmlFor="" className={styles.label}>
                დეპარტამენტი*
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(Number(e.target.value))}
              >
                <option value={-1} disabled selected>
                  აირჩიეთ დეპარტამენტი
                </option>
                {departmentsData.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.emplInput}>
              <label htmlFor="" className={styles.label}>
                პასუხისმგებელი თანამშრომელი*
              </label>
              <select
                value={employee}
                onChange={(e) => setEmployee(Number(e.target.value))}
              >
                <option value={-1} disabled selected>
                  აირჩიეთ თანამშრომელი
                </option>
                {employeeData.map((empl) => (
                  <option data-icon={empl.avatar} key={empl.id} value={empl.id}>
                    <img src={empl.avatar} />
                    {empl.name} {empl.surname}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.dateInput}>
              <label htmlFor="" className={styles.label}>
                დედლაინი
              </label>
              <input type="date" />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <button className={styles.createTaskBtn} disabled={isDisabled()}>
            დავალების შექმნა
          </button>
        </div>
      </div>
    </div>
  );
}
