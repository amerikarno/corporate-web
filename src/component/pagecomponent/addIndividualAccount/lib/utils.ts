import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { useSelector } from "react-redux";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }