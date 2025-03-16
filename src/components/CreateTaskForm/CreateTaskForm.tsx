import { useEffect, useState } from "react";
import { getTodayDate, getTomorrowDate } from "../../utils/dateUtils";
import {
  validateDescription,
  validateTitle,
} from "../../utils/validationUtils";
import styles from "./CreateTaskForm.module.css";
import { useNavigate } from "react-router";
import { useTaskFormData } from "../../utils/useTaskFormData";
import { postTask } from "../../api/api";
import { Department, Employee, Priority, Status } from "../../Types";
import Select, { OptionProps, SingleValue } from "react-select";

const PriorityOption = ({
  data,
  innerRef,
  innerProps,
}: OptionProps<Priority, false>) => {
  return (
    <div ref={innerRef} {...innerProps} className={styles.optionStyle}>
      <img src={data.icon} alt="" />
      <span>{data.name}</span>
    </div>
  );
};

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

const DepartmentOption = ({
  data,
  innerRef,
  innerProps,
}: OptionProps<Department, false>) => {
  return (
    <div ref={innerRef} {...innerProps} className={styles.optionStyle}>
      <span>{data.name}</span>
    </div>
  );
};

const EmployeeOption = ({
  data,
  innerRef,
  innerProps,
}: OptionProps<Employee, false>) => {
  return (
    <div ref={innerRef} {...innerProps} className={styles.optionStyle}>
      <img
        src={data.avatar}
        alt=""
        style={{
          marginRight: "10px",
          width: "30px",
          height: "30px",
          borderRadius: "15px",
        }}
      />
      <span>
        {data.name} {data.surname}
      </span>
    </div>
  );
};

export default function CreateTaskForm() {
  const navigate = useNavigate();

  const { departments, employees, priorities, statuses } = useTaskFormData();

  const [form, setForm] = useState({
    title: "",
    description: "",
    department: -1,
    employee: -1,
    priority: -1,
    status: -1,
    date: getTomorrowDate(),
  });

  useEffect(() => {
    const defaultPriority = priorities.find(
      (option) => option.name === "საშუალო"
    );
    const defaultStatus = statuses.find(
      (option) => option.name === "დასაწყები"
    );

    if (defaultPriority && defaultStatus) {
      setForm((prev) => ({
        ...prev,
        priority: defaultPriority.id,
        status: defaultStatus.id,
      }));
    }
  }, [priorities, statuses]);

  const titleErrors = validateTitle(form.title);
  const descErrors = validateDescription(form.description);

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "department" && { employee: -1 }), // Reset employee if department changes
    }));
  };

  const correct = { color: "#08A508" };

  const isDisabled = () =>
    titleErrors.minLength ||
    titleErrors.maxLength ||
    descErrors.minWords ||
    descErrors.maxLength ||
    form.department === -1 ||
    !form.title ||
    !form.date ||
    form.status === -1 ||
    form.employee === -1 ||
    form.priority === -1;

  const createTask = async () => {
    try {
      await postTask(
        form.title,
        form.description,
        form.date,
        form.status,
        form.employee,
        form.priority
      );
      navigate("/");
    } catch (error: any) {
      console.log("Error creating task", error);
    }
  };

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
      padding: "0", // Set your desired padding here (e.g., top/bottom 8px, left/right 12px)
    }),
    indicatorSeparator: (baseStyles: any) => ({
      ...baseStyles,
      display: "none",
    }),
  };

  const EmployeeSelect = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      height: "45px",
      padding: "0",
    }),
    container: (baseStyles: any) => ({
      ...baseStyles,
      width: "100%",
    }),
    valueContainer: (baseStyles: any) => ({
      ...baseStyles,
      padding: "0", // Set your desired padding here (e.g., top/bottom 8px, left/right 12px)
    }),
    indicatorSeparator: (baseStyles: any) => ({
      ...baseStyles,
      display: "none",
    }),
  };

  console.log(form);

  return (
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
              value={form.title}
              className={styles.titleInput}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <p
              className={styles.reqField}
              style={!titleErrors.minLength && form.title ? correct : {}}
            >
              მინიმუმ 3 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={!titleErrors.maxLength && form.title ? correct : {}}
            >
              მაქსუმუმ 255 სიმბოლო
            </p>
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="desc" className={styles.label}>
              აღწერა
            </label>
            <textarea
              name="description"
              id="desc"
              className={styles.textArea}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
            <p
              className={styles.reqField}
              style={!descErrors.minWords && form.description ? correct : {}}
            >
              მინიმუმ 4 სიტყვა
            </p>
            <p
              className={styles.reqField}
              style={!descErrors.maxLength && form.description ? correct : {}}
            >
              მაქსიმუმ 255 სიმბოლო
            </p>
          </div>
          <div className={styles.selectInputs}>
            <div>
              <label className={styles.label}>პრიორიტეტი*</label>
              <Select<Priority>
                options={priorities}
                value={priorities.find((p) => p.id === form.priority)}
                getOptionValue={(option: Priority) => String(option.id)} // Convert number to string
                getOptionLabel={(option: Priority) => option.name}
                isSearchable={false}
                onChange={(newVal: SingleValue<Priority>) => {
                  if (newVal) {
                    handleChange("priority", newVal.id);
                  }
                }}
                formatOptionLabel={(option: Priority) => (
                  <div className={styles.optionStyle}>
                    <img src={option.icon} alt="" />
                    {option.name}
                  </div>
                )}
                styles={selectStyles}
                components={{ Option: PriorityOption }}
              />
            </div>
            <div>
              <label className={styles.label}>სტატუსი*</label>
              <Select<Status>
                options={statuses}
                value={statuses.find((s) => s.id === form.status)}
                getOptionValue={(option: Status) => String(option.id)} // Convert number to string
                getOptionLabel={(option: Status) => option.name}
                isSearchable={false}
                onChange={(newVal: SingleValue<Status>) => {
                  if (newVal) {
                    handleChange("status", newVal.id);
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
        </div>
        <div className={styles.inputColumn}>
          <div className={styles.inputCont}>
            <label htmlFor="" className={styles.label}>
              დეპარტამენტი*
            </label>
            <Select<Department>
              options={departments}
              placeholder="აირჩიეთ დეპარტამენტი"
              value={departments.find((s) => s.id === form.department)}
              getOptionValue={(option: Department) => String(option.id)}
              getOptionLabel={(option: Department) => option.name}
              isSearchable={false}
              onChange={(newVal: SingleValue<Department>) => {
                if (newVal) {
                  handleChange("department", newVal.id);
                }
              }}
              formatOptionLabel={(option: Department) => (
                <div className={styles.optionStyle}>{option.name}</div>
              )}
              styles={EmployeeSelect}
              components={{ Option: DepartmentOption }}
            />
          </div>
          <div className={styles.emplInput}>
            <label htmlFor="" className={styles.label}>
              პასუხისმგებელი თანამშრომელი*
            </label>
            <Select<Employee>
              options={
                form.department !== -1
                  ? employees.filter(
                      (employee) => employee.department.id === form.department
                    )
                  : []
              }
              value={employees.find((e) => e.id === form.employee) || null} // Ensure it visually resets
              getOptionValue={(option: Employee) => String(option.id)}
              getOptionLabel={(option: Employee) => option.name}
              placeholder=""
              isSearchable={false}
              onChange={(newVal: SingleValue<Employee>) => {
                if (newVal) {
                  handleChange("employee", newVal.id);
                }
              }}
              formatOptionLabel={(option: Employee) => (
                <div className={styles.optionStyle}>
                  <img
                    src={option.avatar}
                    alt=""
                    style={{
                      marginRight: "10px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "15px",
                    }}
                  />
                  {option.name} {option.surname}
                </div>
              )}
              styles={EmployeeSelect}
              components={{ Option: EmployeeOption }}
            />
          </div>
          <div className={styles.dateInput}>
            <label htmlFor="" className={styles.label}>
              დედლაინი
            </label>
            <input
              type="date"
              id="dateInput"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              min={getTodayDate()}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <button
          className={styles.createTaskBtn}
          disabled={isDisabled()}
          onClick={createTask}
        >
          დავალების შექმნა
        </button>
      </div>
    </div>
  );
}
