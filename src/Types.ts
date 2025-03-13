export interface Status {
  id: number;
  name: string;
}


export interface Department {
  id: number;
  name: string;
}

export interface SelectedFilters {
  priorities: string[];
  departments: string[];
  employees: string[];
}

export type FilterType = "priorities" | "departments" | "employees";

export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
}