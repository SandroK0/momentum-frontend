import { useEffect, useState } from "react";
import styles from "./TasksPage.module.css";
import { getStatuses } from "../../api/api";
import { FilterType, SelectedFilters, Status } from "../../Types";
import Filter from "../../components/Filter/Filter";
import xIcon from "../../assets/x.svg";

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
      console.log("Loaded filters from sessionStorage:", savedFilters);
      setSelectedFilters(JSON.parse(savedFilters));
    }
    setIsInitialMount(false);
    getStatusData();
  }, []);

  useEffect(() => {
    if (isInitialMount) return;

    console.log("Saving filters to sessionStorage:", selectedFilters);
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
        <div className={styles.taskColumn}></div>
        <div className={styles.taskColumn}></div>
        <div className={styles.taskColumn}></div>
        <div className={styles.taskColumn}></div>
      </div>
    </div>
  );
}
