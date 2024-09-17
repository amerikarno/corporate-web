import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import Landingpagelayout from "./layout/landingpagelayout.tsx";
import Test from "./pages/test.tsx";

let helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            {/* <Route
              path={`${import.meta.env.BASE_URL}`}
              element={<Landingpagelayout />}
            >
              <Route index element={<Landing />} />
            </Route> */}
            <Route index element={<Landing />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
