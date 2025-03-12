export interface Status {
  id: number;
  name: String;
}

export interface SelectedFilters {
  priorities: string[];
  departments: string[];
  employees: string[];
}

export type FilterType = "priorities" | "departments" | "employees";
