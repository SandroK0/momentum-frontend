import { useEffect, useState } from "react";
import {
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
} from "../api/api";
import { Department, Employee, Priority, Status } from "../Types";

interface TaskFormData {
  departments: Department[];
  employees: Employee[];
  priorities: Priority[];
  statuses: Status[];
}

export function useTaskFormData(): TaskFormData {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    getDepartments().then(setDepartments);
    getEmployees().then(setEmployees);
    getPriorities().then(setPriorities);
    getStatuses().then(setStatuses);
  }, []);


  return {
    departments,
    employees,
    priorities,
    statuses,
  };
}
