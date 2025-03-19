import { useEffect, useState, useRef } from "react";
import FilterItem from "../FilterItem/FilterItem";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import styles from "./Filter.module.css";
import { Employee, FilterType, SelectedFilters } from "../../Types";
import { getDepartments, getEmployees, getPriorities } from "../../api/api";
import  { setRefetchEmployees } from "../../utils/refetchUtility";

interface FilterProps {
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

function handleEmployeeData(
  employees: Employee[]
): { id: number; name: string }[] {
  return employees.map(({ id, avatar, name, surname }) => ({
    id,
    avatar,
    name: `${name} ${surname}`,
  }));
}

export default function Filter(props: FilterProps) {
  const [filterBy, setFilterBy] = useState<FilterType | "">("");
  const filterContRef = useRef<HTMLDivElement>(null);

  function handleFilterClick(filter: FilterType) {
    setFilterBy(filterBy === filter ? "" : filter);
  }

  const [priorityFiltersData, setPriorityFiltersData] = useState<any[]>([]);
  const [departmentFiltersData, setDepartmentFiltersData] = useState<any[]>([]);
  const [employeeFiltersData, setEmployeeFiltersData] = useState<any[]>([]);

  async function getFiltersData() {
    let priorities = await getPriorities();
    let departments = await getDepartments();
    let employees = await getEmployees();
    employees = handleEmployeeData(employees);

    setPriorityFiltersData(priorities);
    setEmployeeFiltersData(employees);
    setDepartmentFiltersData(departments);
  }

  useEffect(() => {
    setRefetchEmployees(getFiltersData);
    getFiltersData();
    return () => {
      setRefetchEmployees(null as any);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterContRef.current &&
        !filterContRef.current.contains(event.target as Node)
      ) {
        setFilterBy("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filterCont} ref={filterContRef}>
      <div className={styles.filters}>
        {(["departments", "priorities", "employees"] as FilterType[]).map(
          (filter) => (
            <FilterItem
              key={filter}
              filter={filter}
              filterBy={filterBy}
              handleFilterClick={handleFilterClick}
            />
          )
        )}
      </div>
      {filterBy && (
        <FilterDropdown
          filterBy={filterBy}
          filtersData={
            filterBy === "priorities"
              ? priorityFiltersData
              : filterBy === "departments"
              ? departmentFiltersData
              : employeeFiltersData
          }
          selectedFilters={props.selectedFilters}
          setSelectedFilters={props.setSelectedFilters}
          close={() => setFilterBy("")}
        />
      )}
    </div>
  );
}
