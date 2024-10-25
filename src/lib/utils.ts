import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookies } from "./cookies";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/pages/authentication/login/types";
import axios from "@/api/axios";
// import { mockAssetData } from "@/pages/assetDetails/__mock__/mockAsset";
import { TPortfolio } from "@/pages/portfolio/types";
import { toast } from "react-toastify";
import { mockAssetData } from "@/pages/assetDetails/__mock__/mockAsset";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number = 500): Promise<void> {
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

// export function console.log(...args: any[]) {
//   const error = new Error();
//   const stack = error.stack?.split("\n")[2].trim();
//   console.log(stack, ...args);
//   // return [args, stack];
// }

export const getUser = () => {
  const token = getCookies();
  if (token) {
    const user: TUser = jwtDecode(token);
    return user;
  }
  return null;
};

export const isExpiredToken = () => {
  const user = getUser();
  if (user && user.exp) {
    return !(user.exp < Date.now() / 1000);
  }
  return true;
};

export const getAllIcoData = async () => {
  try {
    const res = await axios.post(
      "/api/v1/customer/product/ipo",
      {},
      { headers: { Authorization: `Bearer ${getCookies()}` } }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error while fetching Ico data");
    // TODO: remove mock
    return mockAssetData;
  }
};

export const testApiInfo = async (url: string) => {
  try {
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
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const getAppName = () => {
  let name = "ICO";
  if (window.origin.includes("eliteconsulting")) {
    name = "ELITE CONSULTING";
  }
  return name;
};

export function generateDistinctHexColorSet(length: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < length; i++) {
    const hue = Math.floor((i * 360) / length);
    const color = hslToHex(hue, 70, 50); // You can adjust saturation and lightness as needed
    colors.push(color);
  }

  return colors;
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return (
    "#" +
    Math.round(f(0) * 255)
      .toString(16)
      .padStart(2, "0") +
    Math.round(f(8) * 255)
      .toString(16)
      .padStart(2, "0") +
    Math.round(f(4) * 255)
      .toString(16)
      .padStart(2, "0")
  );
}

export function prepareDataForPieChart(port: TPortfolio[]) {
  if (port.length > 0) {
    let series: number[] = [];
    let labels: string[] = [];
    for (let i = 0; i < port.length; i++) {
      series.push(port[i].investment?.value || 0);
      labels.push(port[i].asset?.name || "null");
    }
    const colorSet = generateDistinctHexColorSet(labels.length);
    return {
      series: series,
      colors: colorSet,
      labels: labels,
    };
  }
  return {
    series: [100],
    colors: ["#D3D3D3"],
    labels: ["asset"],
  };
}

export function prepareDataForColumnChart(port: TPortfolio[]) {
  if (port.length > 0) {
    // let seriesObj = {
    //   name: "value",
    //   data: [],
    // };
    let seriesValue: number[] = [];
    let categories: string[] = [];
    for (let i = 0; i < port.length; i++) {
      seriesValue.push(port[i].investment?.value || 0);
      categories.push(port[i].asset?.name || "null");
    }
    return {
      series: [{ name: "value", data: seriesValue }],
      categories: categories,
    };
  }
  return {
    series: [{ name: "value", data: [] }],
    categories: ["ICO"],
  };
}
