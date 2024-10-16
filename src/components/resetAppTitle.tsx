import { resetTitleFavIcon } from "@/lib/utils";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ResetAppTitle() {
  const location = useLocation();

  useEffect(() => {
    resetTitleFavIcon();
  }, [location]);

  return null;
}
