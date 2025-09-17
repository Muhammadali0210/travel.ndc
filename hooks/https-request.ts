import axios, { AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "@/lib/constants";

const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
export { BASE_URL };

