import { useEffect, useState } from "react";
import { getDepartments, getPriorities } from "../../api/api";
import styles from "./FilterDropdown.module.css";
import { FilterType, SelectedFilters } from "../../Types";

interface FilterDropdownProps {
  filterBy: FilterType;
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
  close: () => void;
}

export default function FilterDropdown(props: FilterDropdownProps) {
  const { filterBy, selectedFilters, setSelectedFilters, close } = props;
  const [selectedFiltersLocal, setSelectedFiltersLocal] = useState<
    Array<string>
  >([]);
  const [filters, setFilters] = useState<any[]>([]);
  const [msg, setMsg] = useState<string>("");

  async function getFiltersData(filterBy: FilterType) {
    try {
      let data;
      switch (filterBy) {
        case "priorities":
          data = await getPriorities();
          break;
        case "departments":
          data = await getDepartments();
          break;
        case "employees":
          // Fake data for testing
          data = [
            { id: 1, name: "სანდრო ქარავა" },
            { id: 2, name: "სანდრა ქარდავა" },
          ];
          break;
        default:
          return;
      }
      setFilters(data);
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    setFilters([]);
    setMsg("");
    getFiltersData(filterBy);
    setSelectedFiltersLocal(selectedFilters[filterBy]);
  }, [filterBy]);

  function handleCheckboxChange(value: string) {
    setSelectedFiltersLocal((prev) => {
      if (filterBy === "employees") {
        return [value];
      }

      return prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
    });
  }

  function submitChanges() {
    selectedFilters[filterBy] = selectedFiltersLocal;
    setSelectedFilters({ ...selectedFilters });
  }

  return (
    <div className={styles.filterDropdown}>
      <div className={styles.filterCont}>
        {filters.length > 0 &&
          filters.map((el: any) => (
            <div className={styles.filter} key={el.id}>
              <input
                type="checkbox"
                checked={selectedFiltersLocal.includes(el.name)}
                onChange={() => handleCheckboxChange(el.name)}
              />
              <div>{el.name}</div>
            </div>
          ))}
        {msg && <p>{msg}</p>}
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <button
          onClick={() => {
            submitChanges();
            close();
          }}
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}
