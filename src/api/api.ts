import axios from "axios";
import { API_URL } from "../config";

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