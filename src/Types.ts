export interface Status {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
  icon: string;
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

export interface TaskData {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: Status;
  department: Department;
  priority: Priority;
  employee: Employee;
  total_comments: number
}
