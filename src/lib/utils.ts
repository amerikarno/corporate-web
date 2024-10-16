import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookies } from "./cookies";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/pages/authentication/login/types";
import axios from "@/api/axios";
import { mockAssetData } from "@/pages/assetDetails/__mock__/mockAsset";

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

export function consolelog(...args: any[]) {
  const error = new Error();
  const stack = error.stack?.split("\n")[2].trim();
  console.log(stack, ...args);
}

export const getUser = () => {
  const token = getCookies();
  if (token) {
    const user: TUser = jwtDecode(token);
    return user;
  }
  return null;
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
    consolelog(res);
  } catch (error) {
    console.log(error);
  }
};

export const getAppName = () => {
  let appName = "ICO";
  if (window.origin.includes("eliteconsulting")) {
    appName = "Elite Consulting";
  }
  return appName;
};

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

// export const resetTitleFavIcon = () => {
//   const url = "";
//   document.title = "ICO Campaign Portal";

//   const link: HTMLLinkElement | null =
//     document.querySelector("link[rel~='icon']");

//   if (!link) {
//     const newLink = document.createElement("link");
//     newLink.rel = "icon";
//     newLink.href = url;
//     document.head.appendChild(newLink);
//   } else {
//     link.href = url;
//   }
// };
