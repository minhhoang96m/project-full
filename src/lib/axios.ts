import axios from "axios";

const BASE_URL = "http://localhost:3000";

const BASE_URL_PREFIX = "http://localhost:3000/api/user"

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: BASE_URL_PREFIX,
  headers: { "Content-Type": "application/json" },
});