import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export default function HelmetLayout() {
  const faviconLink = document.querySelector('link[rel="icon"]');
  faviconLink?.remove();

  const base = window.origin;
  // const title = base.includes("eliteconsulting") ? "ICO" : "ELITE CONSULTING";
  const title = base.includes("eliteconsulting") ? "ELITE CONSULTING" : "ICO";
  // const href = base.includes("eliteconsulting") ? "/fda.png" : "/e.png";
  const href = base.includes("eliteconsulting") ? "/e.png" : "/fda.png";

  return (
    <main>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" type="image/png" href={href} />
      </Helmet>
      <Outlet />
    </main>
  );
}
