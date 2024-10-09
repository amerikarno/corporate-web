import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookies } from "./cookies";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/pages/authentication/login/types";
import axios from "@/api/axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatNumberToCommasFraction(
  input: string | undefined | null
): string | null {
  if (!input || input === null) {
    return null;
  }
  const trimInput = input.trim();
  const number = parseFloat(trimInput);

  if (trimInput === "" || isNaN(number)) {
    return null;
  }

  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function consoleLog(...args: any[]) {
  const error = new Error();
  const stack = error.stack?.split("\n")[2].trim();
  console.log(`[${stack}]`, ...args);
}

export const getUser = () => {
  const token = getCookies();
  if (token) {
    const user: TUser = jwtDecode(token);
    return user;
  }
  return null;
};

export const getApiInfo = async (url: string) => {
  const res = await axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookies()}`,
      },
    }
  );
  consoleLog(res);
};
