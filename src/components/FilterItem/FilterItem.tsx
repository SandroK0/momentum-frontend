import { useState } from "react";
import styles from "./FilterItem.module.css";
import activeDropDownIcon from "../../assets/active-dropdown.svg";
import dropDownIcon from "../../assets/dropdown.svg";
import { FilterType } from "../../Types";



interface FilterItemProps {
  filter: FilterType;
  filterBy: string;
  handleFilterClick: (filter: FilterType) => void;
}

export default function FilterItem({ filter, filterBy, handleFilterClick }: FilterItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = filterBy === filter;

  return (
    <div
      style={isActive ? { color: "#8338EC" } : {}}
      className={styles.filter}
      onClick={() => handleFilterClick(filter)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {filter === "departments" && "დეპარტამენტი"}
      {filter === "priorities" && "პრიორიტეტი"}
      {filter === "employees" && "თანამშრომელი"}
      <img src={isActive || isHovered ? activeDropDownIcon : dropDownIcon} />
    </div>
  );
}
