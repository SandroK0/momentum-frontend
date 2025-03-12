import { useState } from "react";
import FilterItem from "../FilterItem/FilterItem";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import styles from "./Filter.module.css";
import { FilterType, SelectedFilters } from "../../Types";

interface FilterProps {
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export default function Filter(props: FilterProps) {
  const [filterBy, setFilterBy] = useState<FilterType | "">("");

  function handleFilterClick(filter: FilterType) {
    setFilterBy(filterBy === filter ? "" : filter);
  }

  return (
    <div className={styles.filterCont}>
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
          selectedFilters={props.selectedFilters}
          setSelectedFilters={props.setSelectedFilters}
          close={() => setFilterBy("")}
        />
      )}
    </div>
  );
}
