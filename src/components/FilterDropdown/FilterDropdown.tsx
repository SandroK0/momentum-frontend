import { useEffect, useState } from "react";
import styles from "./FilterDropdown.module.css";
import { FilterType, SelectedFilters } from "../../Types";

interface FilterDropdownProps {
  filterBy: FilterType;
  selectedFilters: SelectedFilters;
  filtersData: any[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
  close: () => void;
}

export default function FilterDropdown(props: FilterDropdownProps) {
  const { filterBy, selectedFilters, setSelectedFilters, close, filtersData } =
    props;
  const [selectedFiltersLocal, setSelectedFiltersLocal] = useState<
    Array<string>
  >([]);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    setMsg("");
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
        {filtersData.length > 0 &&
          filtersData.map((el: any) => (
            <div className={styles.filter} key={el.id}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={selectedFiltersLocal.includes(el.name)}
                onChange={() => handleCheckboxChange(el.name)}
              />
              {el.avatar && (
                <img src={el.avatar} className={styles.avatar} alt="avatar" />
              )}
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
