import { useEffect, useState } from "react";
import styles from "./TasksPage.module.css";
import { getStatuses } from "../../api/api";
import { Status } from "../../Types";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import activeDropDownIcon from "../../assets/active-dropdown.svg";
import dropDownIcon from "../../assets/dropdown.svg";

type Filter = "priorities" | "departments" | "co-workers";

export default function TasksPage() {
  const [statuses, setStatuses] = useState<Array<Status> | null>(null);
  const [filterBy, setFilterBy] = useState<Filter | "">("");

  function getStatusColor(statusId: number) {
    const statusColors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

    return statusColors[statusId - 1];
  }

  function handleFilterClick(filter: Filter) {
    setFilterBy(filterBy === filter ? "" : filter);
  }

  async function getStatusData() {
    try {
      const data = await getStatuses();
      console.log(data);
      setStatuses(data);
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    getStatusData();
  }, []);

  return (
    <div className={styles.taskPage}>
      <h1>დავალებების გვერდი</h1>
      <div className={styles.filterCont}>
        <div className={styles.filters}>
          <div
            style={filterBy === "departments" ? { color: "#8338EC" } : {}}
            className={styles.filter}
            onClick={() => handleFilterClick("departments")}
          >
            დეპარტამენტი
            {filterBy === "departments" ? (
              <img src={activeDropDownIcon} />
            ) : (
              <img src={dropDownIcon} />
            )}
          </div>
          <div
            style={filterBy === "priorities" ? { color: "#8338EC" } : {}}
            className={styles.filter}
            onClick={() => handleFilterClick("priorities")}
          >
            პრიორიტეტი
            {filterBy === "priorities" ? (
              <img src={activeDropDownIcon} />
            ) : (
              <img src={dropDownIcon} />
            )}
          </div>
          <div
            style={filterBy === "co-workers" ? { color: "#8338EC" } : {}}
            className={styles.filter}
            onClick={() => handleFilterClick("co-workers")}
          >
            თანამშრომელი
            {filterBy === "co-workers" ? (
              <img src={activeDropDownIcon} />
            ) : (
              <img src={dropDownIcon} />
            )}
          </div>
        </div>
        {filterBy && (
          <FilterDropdown filterBy={filterBy} close={() => setFilterBy("")} />
        )}
      </div>
      <div className={styles.selectedFilters}></div>
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
