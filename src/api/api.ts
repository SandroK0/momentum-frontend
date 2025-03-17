import axios from "axios";
import { API_URL } from "../config";
import { TOKEN } from "../config";

export const getAuthHeaders = () => {
  return { Authorization: `Bearer ${TOKEN}` };
};

export async function getStatuses() {
  const response = await axios.get(`${API_URL}/statuses`);

  return response.data;
}

export async function getPriorities() {
  const response = await axios.get(`${API_URL}/priorities`);

  return response.data;
}

export async function getDepartments() {
  const response = await axios.get(`${API_URL}/departments`);

  return response.data;
}

export async function getEmployees() {
  const response = await axios.get(`${API_URL}/employees`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function getAllTasks() {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}

export async function getTask(id: number) {
  const response = await axios.get(`${API_URL}/tasks/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}

export async function postEmployee(
  name: string,
  surname: string,
  avatar: File,
  department_id: number
) {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("department_id", department_id.toString());
  formData.append("avatar", avatar, avatar.name);

  const response = await axios.post(`${API_URL}/employees`, formData, {
    headers: {
      ...getAuthHeaders(),
      Accept: "application/json",
    },
  });

  return response.data;
}

export async function postTask(
  name: string,
  description: string,
  due_date: string,
  status_id: number,
  employee_id: number,
  priority_id: number
) {
  const response = await axios.post(
    `${API_URL}/tasks`,
    {
      name,
      description,
      due_date,
      status_id,
      employee_id,
      priority_id,
    },
    {
      headers: {
        ...getAuthHeaders(),
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

export async function putTaskStatus(id: number, status_id: number) {
  const response = await axios.put(
    `${API_URL}/tasks/${id}`,
    {
      status_id,
    },
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
}

export async function getAllComments(taskId: number) {
  const response = await axios.get(`${API_URL}/tasks/${taskId}/comments`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function postComment(
  taskId: number,
  text: string,
  parent_id?: number
) {
  const response = await axios.post(
    `${API_URL}/tasks/${taskId}/comments`,
    {
      text,
      parent_id,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
}
