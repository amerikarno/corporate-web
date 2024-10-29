import { useLayoutEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { isExpiredToken } from "@/lib/utils";
import { removeCookies } from "@/lib/cookies";

function useNextTick(callback: () => void) {
  useLayoutEffect(() => {
    const id = setTimeout(() => {
      callback();
    }, 0);
    return () => clearTimeout(id);
  }, [callback]);
}

export default function TokenCheck() {
  const navigate = useNavigate();

  const checkToken = useCallback(() => {
    const isExp = isExpiredToken();
    console.log("is token expired", isExp);
    if (isExp) {
      removeCookies();
      navigate("/authentication/login");
    }
  }, []);

  useNextTick(checkToken);

  return null;
}
