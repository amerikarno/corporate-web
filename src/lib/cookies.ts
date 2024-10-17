import Cookies from "js-cookie";

const TOKEN_KEY = "ico-token";

export const setCookies = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
};

export const getCookies = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeCookies = () => {
  Cookies.remove(TOKEN_KEY);
};
