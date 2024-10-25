import axios from "axios";
// import { log } from "console";
// import log from "@/log/log";

const BASE_URL = window.origin;
const BASE_URL2 = "https://admin.eliteconsulting.io";

// console.log("base url:", BASE_URL);

const checkBase = () => {
  let baseTmp = BASE_URL;
  if (window.origin.includes("eliteconsulting")) {
    baseTmp = BASE_URL2;
  }
  return baseTmp;
};

export default axios.create({
  // baseURL: BASE_URL,
  baseURL: checkBase(),
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
