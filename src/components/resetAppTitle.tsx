import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ResetAppTitle() {
  const updateFavicon = async (url: string) => {
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");

    if (!link) {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = url;
      document.head.appendChild(newLink);
    } else {
      link.href = url;
    }
  };

  const location = useLocation();

  useEffect(() => {
    document.title = "ICO";
    updateFavicon("/fda.png");
  }, [location]);

  return null;
}
