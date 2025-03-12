import { useEffect, useState } from "react";
import { getDepartments, getPriorities } from "../../api/api";
import styles from "./FilterDropdown.module.css";

interface FilterDropdownProps {
  filterBy: "priorities" | "departments" | "co-workers";
  close: () => void;
}

export default function FilterDropdown(props: FilterDropdownProps) {
  const [filters, setFilters] = useState<any>();
  const [msg, setMsg] = useState<string>("")

  async function getFiltersData(filterBy: string) {
    try {
      let data;
      let msg;
      switch (filterBy) {
        case "priorities":
          data = await getPriorities();
          break;
        case "departments":
          data = await getDepartments();
          break;
        default:
          setMsg("ჯერ თანამშრომლები არ დაგიმატებიათ")
          break;
      }
      setFilters(data);
    } catch (err: any) {
      console.log(err);
    }
  }
  useEffect(() => {
    setMsg("")
    getFiltersData(props.filterBy);
  }, [props.filterBy]);

  return (
    <div className={styles.filterDropdown}>
      <div className={styles.filterCont}>
        {filters &&
          filters.map((el: any) => (
            <div className={styles.filter} key={el.id}>
              <input type="checkbox" />
              <div>{el.name}</div>
            </div>
          ))}
          {msg && <p>{msg}</p>}
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <button onClick={props.close}>არჩევა</button>
      </div>
    </div>
  );
}
