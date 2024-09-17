import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "../redux/store";
import Landingswitcher from "./switcher/landingswitcher";
import Backtotop from "./backtotop/backtotop";

const Landingpagelayout = () => {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: "en",
          "data-menu-styles": "dark",
          dir: "ltr",
          class: "light",
          "data-nav-layout": "horizontal",
          "data-header-styles": "light",
          "data-vertical-style": "overlay",
        }}
      />
      <Provider store={store}>
        <Landingswitcher />
        <Outlet />
        <Backtotop />
        <div id="responsive-overlay"></div>
      </Provider>
    </Fragment>
  );
};

export default Landingpagelayout;
