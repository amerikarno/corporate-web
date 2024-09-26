import axios from "axios";
// import { log } from "console";
// import log from "@/log/log";

// const BASE_URL = window.origin;

const BASE_URL = "https://sit-corporate-admin.finansiada.com";

// console.log("base url:", BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
