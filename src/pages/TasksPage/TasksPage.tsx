import { useEffect, useState } from "react";
import styles from "./TasksPage.module.css";
import { getStatuses } from "../../api/api";
import { FilterType, SelectedFilters, Status, TaskData } from "../../Types";
import Filter from "../../components/Filter/Filter";
import xIcon from "../../assets/x.svg";
import TaskCard from "../../components/TaskCard/TaskCard";

const tasks: TaskData[] = [
  {
    id: 359,
    name: "შექმენით readme ფაილი",
    description: "აღწერეთ შესრულებული დავალება რიდმი ფაილით",
    due_date: "2025-12-30T20:00:00.000000Z",
    department: {
      id: 6,
      name: "ტექნოლოგიების დეპარტამენტი",
    },
    employee: {
      id: 272,
      name: "სანდრო",
      surname: "ქარდავა",
      avatar:
        "https://momentum.redberryinternship.ge/storage/employee-avatars/OK84ffrz4rM8lASxZ1b5FyAZLFC18rP3b4WskgdW.jpg",
      department: {
        id: 6,
        name: "ტექნოლოგიების დეპარტამენტი",
      },
    },
    status: {
      id: 1,
      name: "დასაწყები",
    },
    priority: {
      id: 1,
      name: "დაბალი",
      icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg",
    },
    total_comments: 0,
  },
];

export default function TasksPage() {
  const [statuses, setStatuses] = useState<Array<Status> | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    priorities: [],
    departments: [],
    employees: [],
  });

  function getStatusColor(statusId: number) {
    const statusColors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

    return statusColors[statusId - 1];
  }

  async function getStatusData() {
    try {
      const data = await getStatuses();
      setStatuses(data);
    } catch (err: any) {
      console.log(err);
    }
  }

  function handleRemoveFilter(
    filterType: "priorities" | "departments" | "employees",
    filterValue: string
  ) {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (item) => item !== filterValue
      );
      return updatedFilters;
    });
  }

  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("selectedFilters");
    if (savedFilters) {
      setSelectedFilters(JSON.parse(savedFilters));
    }
    setIsInitialMount(false);
    getStatusData();
  }, []);

  useEffect(() => {
    if (isInitialMount) return;

    sessionStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  }, [selectedFilters, isInitialMount]);

  return (
    <div className={styles.taskPage}>
      <h1>დავალებების გვერდი</h1>
      <Filter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      ></Filter>
      <div className={styles.selectedFilters}>
        {[
          ...selectedFilters.priorities.map((item) => ({
            item,
            source: "priorities",
          })),
          ...selectedFilters.departments.map((item) => ({
            item,
            source: "departments",
          })),
          ...selectedFilters.employees.map((item) => ({
            item,
            source: "employees",
          })),
        ].map((obj, index) => (
          <div className={styles.selectedFilter} key={index}>
            <div>{obj.item}</div>
            <img
              src={xIcon}
              onClick={() =>
                handleRemoveFilter(obj.source as FilterType, obj.item)
              }
            />
          </div>
        ))}
        {(selectedFilters.priorities.length > 0 ||
          selectedFilters.departments.length > 0 ||
          selectedFilters.employees.length > 0) && (
          <div
            className={styles.clearAllBtn}
            onClick={() => {
              setSelectedFilters({
                priorities: [],
                departments: [],
                employees: [],
              });
            }}
          >
            გასუფთავება
          </div>
        )}
      </div>

      <div className={styles.statuses}>
        {statuses &&
          statuses.map((status: Status) => (
            <div
              key={status.id}
              className={styles.status}
              style={{ backgroundColor: getStatusColor(status.id) }}
            >
              {status.name}
            </div>
          ))}
      </div>
      <div className={styles.tasks}>
        <div className={styles.taskColumn}>
          <TaskCard taskData={tasks[0]}></TaskCard>
        </div>
        <div className={styles.taskColumn}>
          <TaskCard taskData={tasks[0]}></TaskCard>
          <TaskCard taskData={tasks[0]}></TaskCard>
          <TaskCard taskData={tasks[0]}></TaskCard>
          <TaskCard taskData={tasks[0]}></TaskCard>
        </div>
        <div className={styles.taskColumn}>
          <TaskCard taskData={tasks[0]}></TaskCard>
          <TaskCard taskData={tasks[0]}></TaskCard>
          <TaskCard taskData={tasks[0]}></TaskCard>
        </div>
        <div className={styles.taskColumn}>
          <TaskCard taskData={tasks[0]}></TaskCard>
          <TaskCard taskData={tasks[0]}></TaskCard>
          <TaskCard taskData={tasks[0]}></TaskCard>
        </div>
      </div>
    </div>
  );
}
