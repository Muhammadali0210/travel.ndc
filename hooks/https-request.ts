import axios, { AxiosInstance, AxiosResponse } from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
import useTranslationStore from "@/store/lang.store";
const { lang } = useTranslationStore.getState();
const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  },
});

export default request;

